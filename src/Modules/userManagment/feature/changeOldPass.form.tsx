import { motion } from "framer-motion";
import { fadeIn } from "../../auth/animations/fadeIn";
import { PassInput } from "../../../components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import toast from "react-hot-toast";
import { useChangeOldPass } from "../hooks";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

const validationSchema = Yup.object().shape({
  last_password: Yup.string().required("رمز عبور فعلی الزامی است"),
  new_password: Yup.string()
    .required("رمز عبور جدید الزامی است")
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
  new_password_confirm: Yup.string()
    .required("تایید رمز عبور الزامی است")
    .oneOf([Yup.ref("new_password")], "رمز عبور و تایید آن باید یکسان باشند"),
});

const ChangePasswordForm = () => {
  const { mutate } = useChangeOldPass();

  return (
    <>
      <section dir="rtl" className="flex justify-center">
        <motion.div
          {...fadeIn(0.05, 0, 0.4)}
          className="container mx-auto p-4 md:p-8 max-w-md"
        >
          <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200 ">
            <div className="w-full ">
              <div className="rounded-lg bg-white shadow-lg dark:bg-neutral-800 ">
                <div className="lg:flex lg:flex-wrap ">
                  <div className="px-4 md:px-5 lg:w-full p-8 ">
                    <motion.div
                      {...fadeIn(0.05, 10)}
                      className="mx-auto p-4 md:p-8   "
                    >
                      <Formik
                        initialValues={{
                          last_password: "",
                          new_password: "",
                          new_password_confirm: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          mutate(values, {
                            onSuccess: () => {
                              toast.success("رمز عبور با موفقیت بازیابی شد");
                              setSubmitting(false);
                            },
                            onError: (error: AxiosError<ErrorResponse>) => {
                              toast.error(
                                error.response?.data?.message ||
                                  "خطایی رخ داده است"
                              );
                              setSubmitting(false);
                            },
                          });
                        }}
                      >
                        {({ errors, touched, isSubmitting, getFieldProps }) => (
                          <Form>
                            <div className="mb-4">
                              <PassInput
                                type="password"
                                label="رمز عبور فعلی"
                                placeholder="رمز عبور فعلی"
                                {...getFieldProps("last_password")}
                              />
                              {errors.last_password &&
                                touched.last_password && (
                                  <div className="text-red-500 text-sm mt-1">
                                    {errors.last_password}
                                  </div>
                                )}
                            </div>
                            <div className="mb-4">
                              <PassInput
                                type="password"
                                label="رمز عبور جدید"
                                placeholder="رمز عبور جدید"
                                {...getFieldProps("new_password")}
                              />
                              {errors.new_password && touched.new_password && (
                                <div className="text-red-500 text-sm mt-1">
                                  {errors.new_password}
                                </div>
                              )}
                            </div>
                            <div className="mb-4">
                              <PassInput
                                type="password"
                                label="تایید رمز عبور جدید"
                                placeholder="تایید رمز عبور جدید"
                                {...getFieldProps("new_password_confirm")}
                              />
                              {errors.new_password_confirm &&
                                touched.new_password_confirm && (
                                  <div className="text-red-500 text-sm mt-1">
                                    {errors.new_password_confirm}
                                  </div>
                                )}
                            </div>
                            <button
                              className="inline-block w-full rounded px-4 py-3 text-md font-medium uppercase bg-blue-950 leading-normal text-white shadow-md transition duration-150 ease-in-out"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "در حال ارسال..." : "ثبت"}
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default ChangePasswordForm;
