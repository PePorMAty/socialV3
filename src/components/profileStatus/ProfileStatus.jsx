import React, { useEffect, useState } from "react";
import s from "./ProfileStatus.module.scss";

const ProfileStatus = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.profileStatus);

  const updateStatus = () => {
    props.updateStatus(status);
    setEditMode(false);
  };
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  useEffect(() => {
    setStatus(props.profileStatus);
  }, [props.profileStatus]);

  return (
    <div className={s.status}>
      {editMode ? (
        <input
          onBlur={updateStatus}
          value={status}
          autoFocus={true}
          onChange={onStatusChange}
        />
      ) : (
        <div className="" onDoubleClick={() => setEditMode(true)}>
          {status}
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
