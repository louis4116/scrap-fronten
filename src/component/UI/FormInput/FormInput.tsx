import { useField, ErrorMessage } from 'formik';

interface formInputProps {
  id: string;
  type: string;
  name: string;
}

const FormInput = ({ ...props }: formInputProps) => {
  const [field] = useField(props.id);
  return (
    <>
      <div className="mb-2">
        <label htmlFor={props.id} className="form-label">
          {props.name}
        </label>
        <input
          type={props.type}
          className="form-control"
          id={props.id}
          {...field}
        />
      </div>
      <ErrorMessage name={field.name}>
        {(err) => <div className="text-danger mb-3">{err}</div>}
      </ErrorMessage>
    </>
  );
};

export default FormInput;
