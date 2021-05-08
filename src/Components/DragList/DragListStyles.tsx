import styled from 'styled-components';

export const List = styled.div<{ height: number }>`
    box-sizing: border-box;
    height: ${p => p.height}vh;
    width: 15%;
    padding: 10px;
    /* margin: 2.4vh 0px; */
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
        0 1px 3px 1px rgba(60, 64, 67, 0.15);
    overflow-y: auto;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 8px;
    padding-right: 8px;

    h4 {
        text-align: center;
        margin: 0;
    }

    p {
        font-size: 1.2;
        font-weight: 800;
    }
`;

export const ListItem = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;

    p {
        margin: 5px;
        font-size: 1.2rem;
        cursor: pointer;
    }

    svg {
        fill: #eee;

        &:hover {
            fill: #ccc;
        }
    }
`;

export const AddInventory = styled.p`
    margin: 0;
    cursor: pointer;
`;
