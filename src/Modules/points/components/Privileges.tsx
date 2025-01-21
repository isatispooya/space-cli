import usePoint from "../hooks/usePoint";

const PrivilegesComponent = () => {

const {data} = usePoint.useGetPoint()

console.log(data);


    return (
        <div>
            <h1>درحال بروز رسانی سایت هستیم 
                از صبرو شکیبایی شما سپاس گذاریم 
            </h1>
        </div>
    )
}
export default PrivilegesComponent;
