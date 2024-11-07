import { Button } from "@/app/login/styles";
import styled from "styled-components";

export const StyledButton = styled(Button)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .8rem .7rem;

    position: sticky;
    left: 95%;
    bottom: .5rem;

    border-radius: 50% 50% 50% 50%;

    font-size: 12px;
    font-weight: 400;
    z-index: 2;

    svg {
        margin-top: -.5rem;
    }
`;