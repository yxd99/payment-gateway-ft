import { useAppSelector } from "@/store";
import UserForm from "../components/user-form.component";

export default function UserPage() {
  const userInfo = useAppSelector((state) => state.user);
  
  return (
    <div className='flex flex-col p-5 w-full'>
      <h1 className='text-3xl font-bold text-center p-5 border-b-slate-600 border-b'>
        User
      </h1>
      <UserForm initialValues={userInfo}/>
    </div>
  );
}
