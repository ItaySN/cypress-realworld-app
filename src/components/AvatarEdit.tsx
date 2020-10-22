import React, { useState, useEffect } from "react";
import {FormControl, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {Button, Radio, RadioGroup, Slider, Typography} from '@material-ui/core';
import "./AvatarEdit.css";

export interface AvatarEditProps {
  id: string;
  avatar: string;
  updateUser: Function;
}

const AvatarEdit: React.FC<AvatarEditProps> = ( {id, avatar, updateUser} ) => {
  const [margin, setMargin] = useState<number>(5);
  const [background, setBackground] = useState<string>("#123456");
  const [mood, setMood] = useState<string>("happy");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setInitialValues();
  },[open])
  const setInitialValues = () => {
    const urlParams = new URLSearchParams(avatar);
    setMargin(urlParams.get('m') ? parseInt(urlParams.get('m') as string) : 0);
    debugger;
    setBackground(urlParams.get('b') !== null ? urlParams.get('r') as string : "#ffffff");
    setMood(urlParams.get('mood[]') ? urlParams.get('mood[]') as string : "happy");
    debugger;
  }
  const handleSliderChange = (event: unknown, newValue: number | number[]) => { 
    setMargin(newValue as number);
  };

  const handleMoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMood((event.target as HTMLInputElement).value);
  };

  const handleOpen = () => { 
    setOpen(true);
    console.log(avatar);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    updateUser({ id, avatar: `https://avatars.dicebear.com/api/male/${id}.svg?m=${margin}&b=%23${background.slice(1)}&mood[]=${mood}` });
    setOpen(false);
  };

  return (
    <>  
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="edit-avatar-dialog">
        <div id="wrapper" >
      <div key="controllers-wrappers">
        <DialogTitle id="edit-avatar-dialog">Subscribe</DialogTitle>
        <DialogContent>
            
            <Typography id="marginSliderLabel" gutterBottom>
              Margin
            </Typography>
            <Slider value={margin} 
              onChange={(event, newValue) => handleSliderChange(event, newValue)}
              aria-labelledby="marginSliderLabel"
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
          {console.log(`MARGIN: ${margin}`)}
          {background ? <img src={`https://avatars.dicebear.com/api/male/${id}.svg?m=${margin}&b=%23${background.slice(1)}&mood[]=${mood}`} alt=""/> : <></>}
        </div>
        </div>
      </Dialog>
    </>
  );
};

export default AvatarEdit;