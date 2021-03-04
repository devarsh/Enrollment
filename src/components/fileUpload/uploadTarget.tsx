import { FC, CSSProperties, useRef } from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";
import { TargetBoxType } from "./type";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const style = ({ disabled }): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%232538584A' stroke-width='4' stroke-dasharray='8' stroke-dashoffset='4' stroke-linecap='square'/%3e%3c/svg%3e")`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: disabled ? "none" : "all",
  opacity: disabled ? 0.5 : 1,
});

export const UploadTarget: FC<TargetBoxType> = (props) => {
  const { onDrop, disabled, existingFiles } = props;
  const fileUploadControl = useRef<any | null>(null);
  const handleFileSelect = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    onDrop(filesArray as File[], existingFiles);
  };
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop(item, monitor) {
      if (typeof onDrop === "function") {
        const files = Array.from(monitor.getItem().files) as File[];
        onDrop(files, existingFiles);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  return (
    <Box
      //@ts-ignore
      ref={drop}
      style={style({ disabled: Boolean(disabled) })}
      padding={4}
    >
      {isActive ? (
        <Typography>Drop Files here</Typography>
      ) : (
        <>
          <Typography>Drag and Drop or</Typography>
          <Button
            color="primary"
            onClick={() => fileUploadControl?.current?.click()}
          >
            Browse
          </Button>
          <input
            type="file"
            multiple
            style={{ display: "none" }}
            ref={fileUploadControl}
            onChange={handleFileSelect}
            onClick={(e) => {
              //to clear the file uploaded state to reupload the same file (AKA allow our handler to handle duplicate file)
              //@ts-ignore
              e.target.value = "";
            }}
          />
        </>
      )}
    </Box>
  );
};
