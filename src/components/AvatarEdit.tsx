import React, { useState, useEffect } from "react";
import {FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {Button, Radio, RadioGroup, Slider, Typography} from '@material-ui/core';
import "./AvatarEdit.css";

export interface AvatarEditProps {
  id: string;
  avatar: string;
  updateUser: Function;
}

const AvatarEdit: React.FC<AvatarEditProps> = ( {id, avatar, updateUser} ) => {
  const [size, setSize] = useState<number>(0);
  const [background, setBackground] = useState<string>("#ffffff");
  const [mood, setMood] = useState<string>("happy");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setInitialValues();
  },[open])

  const setInitialValues = () => {
    const urlParams = new URLSearchParams(avatar);
    setSize(urlParams.get('m') ? parseInt(urlParams.get('m') as string) : 0);
    setBackground(urlParams.get('b') ? urlParams.get('b') as string : "#ffffff");
    setMood(urlParams.get('mood[]') ? urlParams.get('mood[]') as string : "happy");
  }
  const handleSliderChange = (event: unknown, newValue: number | number[]) => { 
    setSize(newValue as number);
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
    updateUser({ id, avatar: `https://avatars.dicebear.com/api/human/${id}.svg?m=${size}&b=%23${background.slice(1)}&mood[]=${mood}` });
    setOpen(false);
  };

  return (
    <>  
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Customize your avatar
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="edit-avatar-dialog">
        <div id="wrapper">
          <div key="controllers-wrappers">
            <DialogTitle id="edit-avatar-dialog">Subscribe</DialogTitle>
            <DialogContent>
              <Typography id="sizeSliderLabel" gutterBottom>
                Size
              </Typography>
              <Slider value={size} 
                onChange={(event, newValue) => handleSliderChange(event, newValue)}
                aria-labelledby="sizeSliderLabel"
                max={25} />
              <Typography id="colorPickerLabel" gutterBottom>
                Background Color:
              </Typography>
              <input type="color" value={background} onChange={(e) => {
                setBackground(e.target.value)}}/>
              <Typography id="moodLabel" gutterBottom>
                Mood:
              </Typography>
              <RadioGroup aria-label="mood" name="mood1" value={mood} onChange={handleMoodChange}>
                <FormControlLabel value="happy" control={<Radio color="primary" />} label="happy" />
                <FormControlLabel value="sad" control={<Radio color="primary" />} label="sad" />
                <FormControlLabel value="surprised" control={<Radio color="primary" />} label="surprised" />
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </div>
          <div id="img-wrapper" key="avatar-img">
            <img src={`https://avatars.dicebear.com/api/human/${id}.svg?m=${size}&b=%23${background.slice(1)}&mood[]=${mood}`} alt=""/>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AvatarEdit;