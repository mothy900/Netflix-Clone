import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getPopMovie, getRateMovie, IGetPopMovieResult } from "../Api";
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

export default function PopMovie() {
  const { data, isLoading } = useQuery<IGetPopMovieResult>(
    ["background-color", "popMovie"],
    getPopMovie
  );
  const [popIndex, setPopIndex] = useState(0);
  const [popLeaving, setPopLeaving] = useState(false);
  const toggleLeaving = () => setPopLeaving((prev) => !prev);
  const popIncraseIndex = () => {
    if (data) {
      if (popLeaving) return;
      toggleLeaving();
      const totalMovie = data?.results.length - 1;
      const maxPopIndex = Math.ceil(totalMovie / offset) - 1;
      setPopIndex((prev) => (prev === maxPopIndex ? 0 : prev + 1));
    }
  };
  return (
    <>
      <div onClick={popIncraseIndex} style={{ marginTop: "30px" }}>
        {isLoading ? (
          <Loader>Loading ...</Loader>
        ) : (
          <Slider>
            <MovieTitle>인기영화 </MovieTitle>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit={"exit"}
                key={popIndex}
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * popIndex, offset * popIndex + offset)
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
