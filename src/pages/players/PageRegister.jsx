import { Center } from "#components/Center.jsx";
import { FormRegisterPlayer } from "#components/forms/FormRegisterPlayer.jsx";
import { AwaitCommand } from "#components/await-command/AwaitCommand.jsx";

function Component() {
  return (
    <Center>
      <AwaitCommand cmd={afm.registerCashier}>
        <FormRegisterPlayer
          onSubmit={({ fields, setForm }, onError) =>
            parsecmd(afm.registerPlayer(fields, fields.password))
              .then(() => setForm("reset"))
              .catch(onError)
          }
        />
      </AwaitCommand>
    </Center>
  );
}

export { Component };
