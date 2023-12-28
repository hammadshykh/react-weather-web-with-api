import {
    Box,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ onChange, onSubmit, value }) => {
    return (
        <>
            <form onSubmit={onSubmit}>
                <Box>
                    <InputGroup>
                        <Input
                            type="text"
                            value={value}
                            placeholder="Search City"
                            _placeholder={{ color: "white" }}
                            onChange={onChange}
                            bg="#00000023"
                            color="white"
                        />
                        <InputRightAddon children={<AiOutlineSearch color="black" />} />
                    </InputGroup>
                </Box>
            </form>
        </>
    );
};

export default SearchBar;
