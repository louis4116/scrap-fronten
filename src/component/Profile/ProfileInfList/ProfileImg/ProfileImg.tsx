import { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import { useUpdatedImgMutation } from '../../../../api/userDataApi';
import ProfileDefault from './ProfileDefault';
import 'react-image-crop/src/ReactCrop.scss';

interface ProfileImgProps {
  id: string;
  token: string;
  avatar?: string;
  filebase64: string;
  setFileBase64: (value: string) => void;
}

const ProfileImg = ({
  id,
  token,
  avatar,
  filebase64,
  setFileBase64,
}: ProfileImgProps) => {
  const [scale, setScale] = useState(1.5);
  const [show, setShow] = useState(false);
  const [sure, setSure] = useState(false);
  const avatarRef = useRef<AvatarEditor | any>();
  const [updatedImg] = useUpdatedImgMutation();

  const restore = () => {
    setShow(false);
    setSure(false);
    setFileBase64('');
    setScale(1.5);
  };
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length !== 0) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setFileBase64(e.target.result as string);
          setSure(true);
        }
      };
    }
  };
  const check = () => {
    if (avatarRef?.current) {
      const avatar = avatarRef.current.getImage().toDataURL();
      Swal.fire({
        html: `  <img src=${avatar} style="border-radius:50%;width:150px;height:150px"/>`,
        heightAuto: false,
      });
    }
  };
  const toBackEnd = debounce(async () => {
    if (!avatarRef?.current?.props.image) {
      return Swal.fire({
        icon: 'error',
        title: '錯誤！！！',
        text: '請上傳圖片！！！',
        heightAuto: false,
      });
    }
    if (avatarRef?.current && !!avatarRef?.current?.props.image) {
      const avatar = avatarRef?.current.getImage().toDataURL();
      const avatorMb = avatar.length / 1024 / 1024;
      if (avatorMb > 2) return;
      await updatedImg({ id, token, avatar })
        .unwrap()
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '成功！！！',
            text: '上傳成功！！！',
            heightAuto: false,
          });
        })
        .then(() => restore())
        .catch(() =>
          Swal.fire({
            icon: 'error',
            title: '錯誤！！！',
            text: '請確認圖檔大小！！！',
            heightAuto: false,
          }),
        );
    }
  }, 500);

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      {show ? (
        <>
          <div className="d-flex align-items-center justify-content-center flex-column">
            <AvatarEditor
              ref={avatarRef}
              image={filebase64}
              scale={scale}
              borderRadius={100}
              style={{ height: '200px', width: '200px' }}
            />

            <input
              type="file"
              className="form-control mt-2"
              accept=".png, .jpg, .jpeg"
              onChange={handleUpload}
            />
            {sure && (
              <>
                <label htmlFor="scale-input mt-2">Scale: </label>
                <input
                  id="scale-input"
                  className="form-range w-50"
                  type="range"
                  step="0.1"
                  min={1.5}
                  max={5}
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                />
                <button className="btn btn-secondary mt-2" onClick={check}>
                  確認結果
                </button>
              </>
            )}
          </div>
          <span className="d-flex flex-row align-items-center justify-content-center mt-2">
            <button className="btn btn-primary mx-2" onClick={restore}>
              返回
            </button>
            <button className="btn btn-primary mx-2" onClick={toBackEnd}>
              確認送出
            </button>
          </span>
        </>
      ) : (
        <ProfileDefault show={show} setShow={setShow} avatar={avatar} />
      )}
    </div>
  );
};

export default ProfileImg;
