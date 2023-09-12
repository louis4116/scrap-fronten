const ProfileInfUser = ({ name, email }: User) => {
  return (
    <div className="d-flex justify-content-center flex-column my-2 col-12 col-md-9 col-lg-6">
      <h2>個人資料</h2>
      <div style={{ fontSize: '20px' }}>
        <div className="row">
          <p className="col-3">暱稱</p>
          <p className="col-9">{name}</p>
        </div>
        <div className="row">
          <p className="col-3">信箱</p>
          <p className="col-9">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfUser;
