interface Default {
  show: boolean;
  avatar?: string;
  setShow: (value: boolean) => void;
}

const ProfileDefault = ({ show, avatar, setShow }: Default) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-column">
        {avatar ? (
          <img
            src={avatar}
            style={{ width: '200px', height: '200px', borderRadius: '50%' }}
            alt=""
          />
        ) : (
          <img
            src={require('../../../../img/Profile.jpg')}
            style={{ width: '200px', height: '200px', borderRadius: '50%' }}
            alt=""
          />
        )}
      </div>
      <button className="btn btn-primary mt-2" onClick={() => setShow(!show)}>
        修改
      </button>
    </>
  );
};

export default ProfileDefault;
