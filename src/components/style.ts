import { motion } from "framer-motion";
import styled from "styled-components";

export const Wraper = styled.div`
  background-color: black;
  padding-bottom: 250px;
`;
export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
export const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 10px;
`;
export const OverView = styled.p`
  font-size: 30px;
  width: 50%;
`;

export const Slider = styled(motion.div)`
  position: relative;
  padding-bottom: 300px;
`;
export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
  margin-top: 10px;
`;
export const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: gold;
  height: 200px;
  min-width: 210px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  color: Red;
  font-size: 30px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
export const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

export const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -15,
    transition: {
      delay: 0.5,
      duration: 0.3,
    },
  },
};

export const offset = 6;

export const MovieTitle = styled.span`
  font-size: 25px;
  font-weight: 600;
  margin: 10px 20px;

  color: ${(props) => props.theme.white.lighter};
`;
export const Abc = styled.div`
a`;
