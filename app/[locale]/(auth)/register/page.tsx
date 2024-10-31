import { RegisterComponent } from './components/RegisterComponent';

const RegisterPage = async () => (
  <div className="flex h-full w-full flex-col space-y-5 overflow-auto p-10">
    <div className="">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
      </h1>
    </div>
    <RegisterComponent />
  </div>
);

export default RegisterPage;
