import React, { useState } from "react";
import {Button, Typography, TextField, Dialog, DialogActions, DialogContent,
         DialogContentText, DialogTitle, Slider} from '@material-ui/core';
import ColorPicker from "material-ui-color-picker";


export interface AvatarEditProps {
  id: string;
  avatar: string;
}


const AvatarEdit: React.FC<AvatarEditProps> = ( {id, avatar} ) => {
    const [radius, setRadius] = useState<number>(0);
    const [margin, setMargin] = useState<number>(0);
    const [background, setBackground] = useState<string>("#000000");
    const [mood, setMood] = useState<string>();
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
    const handleInputsChange = (newValue: string, origin: string) => {
        switch(origin) {
            case "background":
                setBackground(newValue as string);
                break;
            case "mood":
                setMood(newValue as string);
                break;
        }
      };

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  return (
      <>{console.log(id,avatar)}
       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       Open form dialog
     </Button>
     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
       <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
       <DialogContent>
       <Typography id="continuous-slider" gutterBottom>
        Radius
      </Typography>
         <Slider value={radius} 
                onChange={(event, newValue) => handleSliderChange(event, newValue, "radius")}
                aria-labelledby="continuous-slider" />
       <Typography id="continuous-slider" gutterBottom>
        Margin
      </Typography>
         <Slider value={margin} 
                onChange={(event, newValue) => handleSliderChange(event, newValue, "margin")}
                aria-labelledby="continuous-slider" />
      <Typography id="continuous-slider" gutterBottom>
        Background Color:
      </Typography>
      <ColorPicker
            name='color'
            defaultValue='#000'
            onChange={(color) => handleInputsChange(color, "background")} />
      <Typography id="continuous-slider" gutterBottom>
        Mood:
      </Typography>
       </DialogContent>
       <DialogActions>
         <Button onClick={handleClose} color="primary">
           Cancel
         </Button>
         <Button onClick={handleClose} color="primary">
           Subscribe
         </Button>
       </DialogActions>
     </Dialog>
     </>
  );
};

export default AvatarEdit;