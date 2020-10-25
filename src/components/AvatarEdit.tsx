import React, { useState, useEffect } from "react";
import {FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {Button, Radio, RadioGroup, Slider, Typography} from '@material-ui/core';
import styled from 'styled-components';
import "./AvatarEdit.css";

export interface AvatarEditProps {
  id: string;
  gender: string;
  avatar: string;
  updateUser: Function;
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  margin: auto;
`;
const ImgContainer = styled.div`
  width: 250px;
  height: 250px;
  margin: auto;   
`;
// interface ColorProps {
//   value: string;
//   onchange: function;
// }
const ColorInput = styled.input.attrs((propsObj: {background:string, onchange:Function}) => ({
  type: "color",
  value: propsObj.background,
  onChange: propsObj.onchange
}))`
  width: 100%;
  margin-bottom: 15px;
`;

const AvatarEdit: React.FC<AvatarEditProps> = ( {id, gender, avatar, updateUser} ) => {
  const [size, setSize] = useState<number>(0);
  const [background, setBackground] = useState<string>("#ffffff");
  const [mood, setMood] = useState<string>("happy");
  const [colors, setColors] = useState<string>("blue");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setInitialValues();
  },[open])

  const setInitialValues = () => {
    const urlParams = new URLSearchParams(avatar);
    setSize(urlParams.get('m') ? parseInt(urlParams.get('m') as string) : 0);
    setBackground(urlParams.get('b') ? urlParams.get('b') as string : "#ffffff");
    if(gender === "bottts") {
      setColors(urlParams.get('colors[]') ? urlParams.get('colors[]') as string : "blue");
    } else {
      setMood(urlParams.get('mood[]') ? urlParams.get('mood[]') as string : "happy");
    }
  }
  const handleSliderChange = (event: unknown, newValue: number | number[]) => { 
    setSize(newValue as number);
  };

  const handleMoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMood((event.target as HTMLInputElement).value);
  };

  const handleColorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColors((event.target as HTMLInputElement).value);
  };

  const handleOpen = () => { 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if(gender === "bottts") {
      updateUser({ id, avatar: `https://avatars.dicebear.com/api/${gender}/${id}.svg?m=${size}&b=%23${background.slice(1)}&colors[]=${colors}` });
    } else {
      updateUser({ id, avatar: `https://avatars.dicebear.com/api/${gender}/${id}.svg?m=${size}&b=%23${background.slice(1)}&mood[]=${mood}` });
    }
    setOpen(false);
  };

  if(gender === "bottts") { // return form with robot options
    return (
      <>  
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          Customize your avatar
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="edit-avatar-dialog">
          <DialogTitle id="edit-avatar-dialog">Customize your avatar</DialogTitle>
          <Wrapper>
            <div key="controllers-wrappers">
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
                <ColorInput 
                  background={background}
                  onchange={(e: React.ChangeEvent<HTMLInputElement>) => {setBackground(e.currentTarget.value)}}>
                </ColorInput>
                <Typography id="moodLabel" gutterBottom>
                  Color:
                </Typography>
                <RadioGroup aria-label="colors" name="colors1" value={colors} onChange={handleColorsChange}>
                  <FormControlLabel value="blue" control={<Radio color="primary" />} label="blue" />
                  <FormControlLabel value="lightGreen" control={<Radio color="primary" />} label="green" />
                  <FormControlLabel value="pink" control={<Radio color="primary" />} label="pink" />
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
            <ImgContainer>
              <img
                src={`https://avatars.dicebear.com/api/${gender}/${id}.svg?m=${size}&b=%23${background.slice(1)}&colors[]=${colors}`}
                alt="avatar-preview"
              />
            </ImgContainer>
          </Wrapper>
        </Dialog>
      </>
    );
  } else { // return form with human options
    return (
      <>  
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          Customize your avatar
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="edit-avatar-dialog">
          <DialogTitle id="edit-avatar-dialog">Customize your avatar</DialogTitle>
          <Wrapper>
            <div key="controllers-wrappers">
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
                <ColorInput 
                  background={background}
                  onchange={(e: React.ChangeEvent<HTMLInputElement>) => {setBackground(e.currentTarget.value)}}>
                </ColorInput>
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
            <ImgContainer>
              <img
                src={`https://avatars.dicebear.com/api/${gender}/${id}.svg?m=${size}&b=%23${background.slice(1)}&mood[]=${mood}`}
                alt="avatar-preview"
              />
            </ImgContainer>
          </Wrapper>
        </Dialog>
      </>
    );
  }
};

export default AvatarEdit;