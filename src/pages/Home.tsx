import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import getMovie, {
  getPopMovie,
  IGetMoviesResult,
  IGetPopMovieResult,
} from "../Api";
import PopMovie from "../components/Pop";
import RateMovie from "../components/Rate";
import {
  Abc,
  Banner,
  Box,
  BoxVariants,
  Loader,
  MovieTitle,
  offset,
  OverView,
  Row,
  rowVariants,
  Slider,
  Title,
  Wraper,
} from "../components/style";
import { makeImagePath } from "../utils";

export default function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["background-color", "nowPlaying"],
    getMovie
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovie = data?.results.length - 1;
      const maxIndex = Math.ceil(totalMovie / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Wraper>
      {isLoading ? (
        <Loader>Loading ...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <OverView>
              {!!data && data?.results[0].overview.length < 100
                ? data?.results[0].overview
                : data?.results[0].overview.substr(0, 99) + "..."}
            </OverView>
          </Banner>
          <MovieTitle>현재 상영 영화 </MovieTitle>

          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit={"exit"}
                key={index}
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      transition={{ type: "tween" }}
                      variants={BoxVariants}
                      whileHover={"hover"}
                      initial="normal"
                      key={movie.id}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    ></Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <PopMovie />
          <RateMovie />
        </>
      )}
    </Wraper>
  );
}
