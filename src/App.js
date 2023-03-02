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
        {errors.email && <p>{errors.email.message}</p>}

        <label>Name</label>
        <input
          name="name"
          placeholder="이름을 입력하세요"
          {...register("name", {
            required: {
              value: true,
              message: "이름을 입력하시오.",
            },
            maxLength: {
              value: 10,
              message: "10자까지 입력 가능합니다.",
            },
            pattern: {
              value: /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
              message:
                "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)",
            },
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <label>생년월일</label>
        <input name="birth" type="date" {...register("birth")} />

        <label>Nickname</label>
        <input
          name="nickname"
          placeholder="닉네임을 입력하세요."
          {...register("nickname", {
            required: {
              value: true,
              message: "닉네임을 입력하세요.",
            },
            maxLength: {
              value: 15,
              message: "닉네임은 최대 15자 이상 가능합니다.",
            },
            minLength: {
              value: 2,
              message: "닉네임은 최소 2자 이상 입력하시오.",
            },
            pattern: {
              value: /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
              message: "공백을 제거해 주십시오.",
            },
          })}
        />
        {errors.nickname && <p>{errors.nickname.message}</p>}

        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: {
              value: true,
              message: "비밀번호를 입력하세요.",
            },
            minLength: {
              value: 10,
              message: "비밀번호는 10자 이상 입력하시오.",
            },
            pattern: {
              value: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
              message: "비밀번호에 특수문자 1개 이상 넣어주세요.",
            },
            // pattern: /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

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
