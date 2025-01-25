import { IFormField } from "@/constants"
import { Input } from "./ui/input"

interface IInputFormProps extends IFormField {
  setFields: React.Dispatch<React.SetStateAction<IFormField[]>>
}

const InputForm = ({
  setFields,
  label,
  error,
  errorMessage,
  ...rest
}: IInputFormProps) => {
  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev: IFormField[]) =>
      prev.map((field) => {
        if (field.id === rest.id) {
          return {
            ...field,
            value: e.target.value,
          }
        }
        return field
      })
    )
  }
  return (
    <div>
      <label>{label}</label>
      <Input
        {...rest}
        onChange={handleChnage}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  )
}

export default InputForm
