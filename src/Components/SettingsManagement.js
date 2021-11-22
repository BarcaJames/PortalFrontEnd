import { useState } from "react";
import { FormControl, InputGroup, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useLazyResetPasswordQuery } from "../store/UserApi";

const SettingsManagement = () => {
  const [email, setEmail] = useState("");
  const [trigger, { isLoading }] = useLazyResetPasswordQuery();

  const handleSubmit = () => {
    var re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
      trigger(email);
    } else {
      toast.warn(`${email} does not match email format of abc@abc.com`);
    }
  };

  return (
    <>
      <h5>Reset Password</h5>
      <InputGroup className="mb-3 w-75">
        <FormControl
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button variant="secondary" disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
        </Button>
      </InputGroup>
    </>
  );
};

export default SettingsManagement;
