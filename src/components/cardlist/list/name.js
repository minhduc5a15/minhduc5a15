import { css } from "@emotion/css";

const Name = ({ name }) => {
     return (
          <span className={css`
                         width: 100%;
                         height: 50%;
                         text-align: flex-start;
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
                         @media (max-width: 450px) {
                              & > span {
                                   font-size: 13px;
                                   letter-spacing: 1.5px;
                              }
                         }
                    `}>
               <span>{name}</span>
          </span>
     );
};
export default Name;
