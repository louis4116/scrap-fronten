import { Formik, Form, Field } from 'formik';
import { useUpdateMemoMutation } from '../../../api/userDataApi';
interface NewsForm {
  memo: string;
  newsId: string;
  token: string;
}
const ProfileNewsListForm = ({ memo, newsId, token }: NewsForm) => {
  const [updateMemo] = useUpdateMemoMutation();
  return (
    <Formik
      initialValues={{
        newsMemo: memo || '',
      }}
      onSubmit={async (value) => {
        await updateMemo({
          memo: value.newsMemo,
          newsId,
          token,
        });
      }}
    >
      <Form>
        <Field
          type="text"
          name="newsMemo"
          className="form-control"
          id="newsMemo"
          placeholder="備註"
          style={{ maxWidth: '400px' }}
        />
      </Form>
    </Formik>
  );
};

export default ProfileNewsListForm;
