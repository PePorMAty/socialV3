import { Field, Form, Formik } from "formik";
import s from "../profileInfo/ProfileInfo.module.scss";

export const ProfileDataForm = ({ profile, onSubmit }) => {
  const contactsObj = Object.keys(profile.contacts).map((key) => {
    return (
      <div className={s.contacts} key={key}>
        <b>
          {key}:
          <Field type="text" placeholder={key} name={"contacts." + key} />
        </b>
      </div>
    );
  });

  return (
    <Formik
      initialValues={profile}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      <Form>
        <button type={"submit"}>save</button>
        <div className="">FullName</div>
        <Field name={"fullName"} type="text" placeholder="FullName" />
        <div className="">aboutMe</div>
        <Field name={"aboutMe"} type="text" placeholder="About me" />
        <div className="">lookingForAJobDescription</div>
        <Field
          name={"lookingForAJobDescription"}
          type="text"
          placeholder="LookingForAJobDescription"
        />
        <div className={s.contactsList}>
          Desc: {profile.lookingForAJobDescription}
        </div>
        <div>
          <b>Contacts</b>
          <div className={s.fields}>{contactsObj}</div>
        </div>
      </Form>
    </Formik>
  );
};
/* facebook: values.facebook,
            website: values.website,
            vk: values.vk,
            twitter: values.twitter,
            instagram: values.instagram,
            youtube: values.youtube,
            github: values.github,
            mainLink: values.mainLink, */
