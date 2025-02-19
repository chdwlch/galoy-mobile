import * as React from "react";
import { Button } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import { palette } from "../../theme/palette";

const styles = EStyleSheet.create({
  buttonContainer: {
    // paddingBottom: 40,
    // minWidth: "120rem", // TODO check if this works as intended
    // marginHorizontal: "40rem", 
    // paddingTop: 20,
    margin: 20,
    minWidth: "200rem",
  },

  buttonStyle: {
    backgroundColor: palette.lightBlue,
    borderRadius: 32,
  },
})

export const BrightButton = props => <Button
  title="Join the waiting list"
  type="solid"
  containerStyle={styles.buttonContainer}
  buttonStyle={styles.buttonStyle}
  titleStyle={{fontWeight: "bold"}}
  {...props}
/>