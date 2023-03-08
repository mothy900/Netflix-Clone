import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  getPopMovie,
  getRateMovie,
  IGetPopMovieResult,
  IGetRateMovieResult,
} from "../Api";
import { makeImagePath } from "../utils";
import {
  Box,
  BoxVariants,
  Loader,
  MovieTitle,
  offset,
  Row,
  rowVariants,
  Slider,
} from "./style";

export default function RateMovie() {
  const { data, isLoading } = useQuery<IGetRateMovieResult>(
    ["background-color", "RateMovie"],
    getRateMovie
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const popIncraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovie = data?.results.length - 1;
      const maxPopIndex = Math.ceil(totalMovie / offset) - 1;
      setIndex((prev) => (prev === maxPopIndex ? 0 : prev + 1));
    }
  };
  return (
    <>
      <div onClick={popIncraseIndex} style={{ marginTop: "30px" }}>
        {isLoading ? (
          <Loader>Loading ...</Loader>
        ) : (
          <Slider>
            <MovieTitle>평점 높은 영화 </MovieTitle>

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
                  .map((item: any) => (
                    <Box
                      transition={{ type: "tween" }}
                      variants={BoxVariants}
                      whileHover={"hover"}
                      initial="normal"
                      key={item.id}
                      bgPhoto={makeImagePath(item.backdrop_path, "w500")}
                    ></Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        )}
      </div>
    </>
  );
}
