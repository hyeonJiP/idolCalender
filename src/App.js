import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  // console.log(watch(`email`, `name`));

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          placeholder="이메일을 입력하세요"
          {...register("email", {
            required: "이메일 입력은 필수입니다.",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {/* {errors.email && errors.email.type === "required" && (
          <p className="errorMsg">이메일을 입력하세요.</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p className="errorMsg">올바른 이메일이 아닙니다.</p>
        )} */}
        {errors.email && <p>{errors.email.message}</p>}

        <label>Name</label>
        <input
          name="name"
          placeholder="이름을 입력하세요"
          {...register("name", { required: true, maxLength: 10 })}
        />
        {errors.name && <p>이름을 입력하세요.</p>}

        <label>Nickname</label>
        <input
          name="nickname"
          placeholder="닉네임을 입력하세요."
          {...register("nickname", {
            required: true,
            maxLength: 15,
            minLength: 3,
          })}
        />
        {errors.nickname && <p>닉네임을 입력하세요.</p>}

        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: "비밀번호 입력은 필수입니다.",
            minLength: 8,
            pattern: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
          })}
        />
        {errors.password && errors.password.type === "pattern" && (
          <p>비밀번호에 특수문자를 1개 이상 넣어주세요.</p>
        )}
        {/* {errors.passwor.type === "minLength" && <p>비밀번호를 8자 이상 입력하세요</p>} */}
        <label>Password Confirm</label>
        <input
          name="passwordConfirm"
          type="password"
          {...register("passwordConfirm", {
            required: true,
            validate: {
              check: (val) => {
                if (getValues("password") !== val) {
                  return "비밀번호가 일치하지 않습니다.";
                }
              },
            },
          })}

          //
        />
        {errors.passwordConfirm && errors.passwordConfirm.type === true && (
          <p>비밀번호를 입력하세요</p>
        )}
        {errors.passwordConfirm && <p>비밀번호가 다릅니다!!</p>}
        <input type="submit" />
      </form>
    </>
  );
}

export default App;
