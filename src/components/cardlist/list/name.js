import { css } from "@emotion/css";
import Typography from "@mui/material/Typography";

const Name = ({ name }) => {
     return (
          <Typography className={css`
                         width: "100%";
                         height: "50%";
                         text-align: "flex-start";
                         padding-left: 20px;
                         & > span {
                              color: var(--name-language-color);
                              font-size: 14px;
                              font-family: "Dosis", sans-serif !important;
                              letter-spacing: 2px;
                              transition: 0.5s ease-in-out;
                         }
                         & > span:hover {
                              letter-spacing: 4px;
                         }
                         @media (max-width: 400px) {
                              & > span {
                                   font-size: 13px;
                                   letter-spacing: 1px;
                              }
                         }
                    `}>
               <span>{name}</span>
          </Typography>
     );
};
export default Name;
