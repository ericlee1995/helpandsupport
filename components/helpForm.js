import IMask from 'imask';
import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import styles from './helpForm.module.css';

export default function HelpForm() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState('');

  function initAutocomplete() {
    var input = document.getElementById('location');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      setLocation(autocomplete.getPlace().formatted_address);
    });
  }

  const onChange = (event, setFieldValue) => {
    if (event.target.name === 'title') {
      setTitle(event.target.value);
      if (event.target.value.length > 100) {
        setTitle(event.target.value.substring(0, 100));
      }
    }
    if (event.target.name === 'details') {
      setDetails(event.target.value);
      if (event.target.value.length > 2000) {
        setDetails(event.target.value.substring(0, 2000));
      }
    }
  };

  useEffect(() => {
    google.maps.event.addDomListener(window, 'load', initAutocomplete);
    var phoneMask = IMask(document.getElementById('phone'), {
      mask: '+{1} (000) 000-0000',
    });
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Formik
          initialValues={{
            title: '',
            details: '',
            name: '',
            email: '',
            phone: '',
            location: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = 'Required';
            }
            if (!values.name) {
              errors.name = 'Required';
            }
            if (
              values.email &&
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form className={styles.form}>
              <Field
                className={styles.field}
                component={TextField}
                name="title"
                type="text"
                label="Title"
                placeholder="I need help with..."
                helperText="What do you need help with?"
                margin="normal"
                variant="outlined"
                autoFocus={true}
                value={title}
                onChange={onChange}
                required
              />
              <br />
              <Field
                className={styles.field}
                component={TextField}
                name="details"
                type="text"
                label="Details"
                multiline
                rows={4}
                margin="normal"
                placeholder="I'm going away for a few days and need someone to look after my dog."
                helperText="Optional"
                variant="outlined"
                value={details}
                onChange={onChange}
              />
              <br />
              <div className={styles.contact}>
                <Field
                  className={styles.field}
                  component={TextField}
                  name="name"
                  type="text"
                  label="Name"
                  helperText="Your name"
                  margin="normal"
                  variant="outlined"
                  required
                />
                <Field
                  className={styles.field}
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  helperText="Optional"
                  margin="normal"
                  variant="outlined"
                />
                <Field
                  id="phone"
                  className={styles.field}
                  component={TextField}
                  name="phone"
                  type="text"
                  label="Phone number"
                  helperText="Optional"
                  margin="normal"
                  variant="outlined"
                />
                <Field
                  id="location"
                  className={styles.field}
                  component={TextField}
                  name="location"
                  type="text"
                  label="Location"
                  helperText="Optional"
                  margin="normal"
                  variant="outlined"
                  onChange={(event) => setLocation(event.target.value)}
                  value={location}
                />
              </div>
              <p className={styles.note}>
                Your personal information won't be shared until you have
                accepted help from someone.
              </p>
              {isSubmitting && <LinearProgress />}
              <br />
              <Button
                variant="contained"
                size="large"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Get Help!
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}
