import usePoint from "../hooks/usePoint";

const PrivilegesComponent = () => {

const {data} = usePoint.useGetPoint()

console.log(data);


    return (
        <div>
            <h1>Privileges</h1>
        </div>
    )
}
export default PrivilegesComponent;
