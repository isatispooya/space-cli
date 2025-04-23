import "moment/locale/fa";
import { useEffect } from "react";
import { useTimeflow } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { setOwnLogs, setOtherLogs } from "../store/verifySlice";
import { RootState } from "../../../store/store";
import { OwnVerify, OtherVerify } from "../components";
import OwnAbsense from "../components/ownAbsense.list";

const TimeflowVerifyFeat = () => {
  const dispatch = useDispatch();
  const { ownLogs, otherLogs } = useSelector(
    (state: RootState) => state.verify
  );

  const { data: userLogins, isLoading } = useTimeflow.useGetUsersLogin();
  const notApprovedOwnLogs = ownLogs.filter(
    (log) => log.status_self === "pending"
  );
  const notApprovedOtherLogs = otherLogs.filter(
    (log) => log.status_parent === "pending"
  );

  useEffect(() => {
    if (userLogins) {
      dispatch(
        setOwnLogs(
          userLogins.own_logs.map((log) => ({ ...log, isOwnLog: true })) || []
        )
      );
      dispatch(
        setOtherLogs(
          userLogins.other_logs.map((log) => ({ ...log, isOwnLog: false })) ||
            []
        )
      );
    }
  }, [userLogins, dispatch]);

  const hasNoLogsToVerify =
    !isLoading &&
    (() => {
      const hasOwnLogs =
        notApprovedOwnLogs.filter((log) => log.type !== "logout").length > 0;
      const hasOtherLogs = notApprovedOtherLogs.length > 0;
      const hasAbsenceLogs =
        userLogins?.own_absence && userLogins.own_absence.length > 0;

      return !hasOwnLogs && !hasOtherLogs && !hasAbsenceLogs;
    })();

  return (
    <div className="min-h-screen  py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-lg p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            تردد
          </h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {hasNoLogsToVerify ? (
                <div className="text-center py-8 text-gray-500">
                  هیچ تردد تایید نشده‌ای وجود ندارد
                </div>
              ) : (
                <>
                  {notApprovedOwnLogs.length > 0 ? (
                    <OwnVerify logs={notApprovedOwnLogs} />
                  ) : null}

                  {notApprovedOtherLogs.length > 0 ? (
                    <OtherVerify logs={notApprovedOtherLogs} />
                  ) : null}

                  {userLogins?.own_absence &&
                  userLogins.own_absence.length > 0 ? (
                    <OwnAbsense logs={userLogins.own_absence} />
                  ) : null}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeflowVerifyFeat;
