import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react"


const SearchBar = () => {
    return (
        <>
            <Box>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input type='text' />
                </FormControl>
            </Box>
        </>
    )
}

export default SearchBar