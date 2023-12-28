import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SearchBar from "../../Common/SearchBar/SearchBar";
import axios from "axios";
import { FaCloud, FaCloudBolt, FaSmog } from "react-icons/fa";
import {
    BsFillCloudDrizzleFill,
    BsCloudRainHeavyFill,
    BsCloudSnowFill,
} from "react-icons/bs";
import { useToast } from "@chakra-ui/react";

const Weather = () => {
    const [search, SetSearch] = useState("london");
    const [city, setCity] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState("");
    const [times, setTimes] = useState("");

    const toast = useToast();

    const notify = ({ status, title, disc, position }) => {
        toast({
            title: title,
            description: disc,
            status: status,
            duration: 1000,
            isClosable: true,
            position: position,
        });
    };

    let componentsMounted = true;

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading("Loading...");
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d2e9e3530e3eecb6b8b5504876a4281c`
                );

                if (componentsMounted) {
                    console.log(await response?.data);
                    setData(await response?.data);
                }
                notify({
                    status: "success",
                    disc: "Sure!",
                    position: "top-right",
                });
            } catch (error) {
                console.log(error);
                notify({
                    status: "error",
                    disc: "Field is not Found",
                    position: "top-right",
                });
            }
            return () => {
                componentsMounted = false;
            };
        };
        fetchWeather();
    }, [search]);

    let temp = (data?.main?.temp - 273.15).toFixed(2);
    let temp_min = (data?.main?.temp_min - 273.15).toFixed(2);
    let temp_max = (data?.main?.temp_max - 273.15).toFixed(2);
    let fellLike = (data?.main?.feels_like - 273.15).toFixed(2);
    // let cloud = data?.weather[0].main

    const HanldeChange = (e) => {
        const { value } = e.target;
        setCity(value);
        console.log(city);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        SetSearch(city);
        setCity("");
    };

    let dateFull = new Date();
    let date = dateFull.getDate();
    let year = dateFull.getFullYear();
    let month = dateFull.toLocaleString("default", { month: "long" });
    let day = dateFull.toLocaleString("default", { weekday: "long" });

    function datePrinter() {
        const fullDate = new Date();
        const formattedDateAndTime = fullDate.toLocaleTimeString(undefined, {});

        return formattedDateAndTime;
    }
    setInterval(function () {
        setTimes(datePrinter());
    }, 1000);

    return (
        <>
            <Box
                backgroundImage="url('/weather.jpg')"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                pos="relative"
                minH="100vh">
                <Box bg="#00000023" color="white" w="100%" h="100%" pos="absolute">
                    <Box
                        maxW="992px"
                        m={{ md: "8rem auto" }}
                        mt={["2rem", "2rem", "8rem", "8rem", "8rem"]}
                        px="1rem">
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Box w="500px">
                                <SearchBar
                                    value={city}
                                    onChange={HanldeChange}
                                    onSubmit={handleSubmit}
                                />
                                {data ? (
                                    <Box
                                        bg="#0707073f"
                                        p="20px"
                                        mt="1rem"
                                        boxShadow="1px 3px 8px black">
                                        <Box>
                                            <Box textAlign="center" borderBottom="1px solid white">
                                                <Heading>{data.name}</Heading>
                                                <Text fontSize="19px" my="1rem">
                                                    {day}, {month} {date}, {year}
                                                </Text>
                                                <Text fontSize="19px" my="1rem">
                                                    <span>Time : </span> {times}
                                                </Text>
                                            </Box>
                                            <Flex justify="center">
                                                <Box textAlign="center">
                                                    <Heading ms="3rem" fontSize="80px">
                                                        <FaCloud />
                                                    </Heading>
                                                    <Heading>{temp} &deg;c</Heading>
                                                    {data?.weather?.map((v, i) => (
                                                        <Text my="1rem" key={i}>
                                                            {v.main}
                                                        </Text>
                                                    ))}
                                                    <Text>
                                                        min {temp_min}&deg;C | max {temp_max}&deg;C
                                                    </Text>
                                                    <Flex
                                                        mt=".5rem"
                                                        alignItems="center"
                                                        justifyContent="center">
                                                        <Box me=".4rem">Feel Like : </Box>
                                                        <Box>{fellLike}&deg;C</Box>
                                                    </Flex>
                                                </Box>
                                            </Flex>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box>{loading}</Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Weather;
