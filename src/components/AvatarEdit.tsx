import React, { useState } from "react";
import {FormControl, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {Button, Radio, RadioGroup, Slider, Typography} from '@material-ui/core';
import ColorPicker from "material-ui-color-picker";

export interface AvatarEditProps {
  id: string;
  avatar: string;
  updateUser: Function;
}

const AvatarEdit: React.FC<AvatarEditProps> = ( {id, avatar, updateUser} ) => {
  const [radius, setRadius] = useState<number>(0);
  const [margin, setMargin] = useState<number>(0);
  const [background, setBackground] = useState<string>("#000");
  const [mood, setMood] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleSliderChange = (event: unknown, newValue: number | number[], origin: string) => {
    switch(origin) {
      case "radius":
        setRadius(newValue as number);
        break;
      case "margin":
        setMargin(newValue as number);
        break;
    }
  };
  const handleColorChange = (newValue: string) => {
    setBackground(newValue as string);
  };

  const handleMoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMood((event.target as HTMLInputElement).value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    /*
      update avatar url
    */
    updateUser({ id: id, avatar: 'https://avatars.dicebear.com/api/human/DJv6wthWm.svg' });
    setOpen(false);
  };

  return (
    <> {console.log(id,avatar)} {/* delete after using it elsewhere */}
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="edit-avatar-dialog">
        <DialogTitle id="edit-avatar-dialog">Subscribe</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <Typography id="radiusSliderLabel" gutterBottom>
              Radius
            </Typography>
            <Slider
              value={radius} 
              onChange={(event, newValue) => handleSliderChange(event, newValue, "radius")}
              aria-labelledby="radiusSliderLabel"
            />
            <Typography id="marginSliderLabel" gutterBottom>
              Margin
            </Typography>
            <Slider value={margin} 
              onChange={(event, newValue) => handleSliderChange(event, newValue, "margin")}
              aria-labelledby="marginSliderLabel" />
            <Typography id="colorPickerLabel" gutterBottom>
              Background Color:
            </Typography>
            <ColorPicker
              name='color'
              defaultValue={background}
              onChange={(color) => handleColorChange(color)} />
            <Typography id="moodLabel" gutterBottom>
              Mood:
            </Typography>
            <RadioGroup aria-label="mood" name="mood1" value={mood} onChange={handleMoodChange}>
              <FormControlLabel value="happy" control={<Radio color="primary" />} label="happy" />
              <FormControlLabel value="sad" control={<Radio color="primary" />} label="sad" />
              <FormControlLabel value="surprised" control={<Radio color="primary" />} label="surprised" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AvatarEdit;