import { styled } from "styled-components";
import { ReactComponent as LogoSVG } from "../../asset/Logo.svg";
import { ReactComponent as SearchSVG } from "../../asset/SearchIcon.svg";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useAnimation,
} from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import React, { useState } from "react";

const logoVariants = {
  normal: {
    opacity: 1,
  },
  active: {
    opacity: [0, 0.2, 0, 0.5, 0, 0.3, 0, 0.8, 0, 1],
    transition: {
      repeat: Infinity,
      duration: 1.8,
    },
  },
};

const navVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isHomePage = useMatch("/");
  const isTvPage = useMatch("tv");
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();

  useMotionValueEvent(scrollY, "change", () => {
    if (scrollY.get() > 80) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });

  return (
    <Nav variants={navVariants} animate={navAnimation} initial="top">
      <Col>
        <Link to="/">
          <Logo variants={logoVariants} initial="normal" whileHover="active" />
        </Link>
        <Items>
          <Link to="/">
            <Item>Home {isHomePage && <Circle layoutId="circle" />}</Item>
          </Link>
          <Link to="tv">
            <Item>Tv Shows {isTvPage && <Circle layoutId="circle" />}</Item>
          </Link>
        </Items>
      </Col>
      <Col>
        <SearchWrapper>
          <SearchIcon
            transition={{ type: "linear" }}
            onClick={toggleSearch}
            animate={{ x: isSearchOpen ? -170 : 0 }}
          />
          {isSearchOpen && (
            <Input
              transition={{ type: "linear" }}
              animate={{ scaleX: isSearchOpen ? 1 : 0 }}
            />
          )}
        </SearchWrapper>
      </Col>
    </Nav>
  );
}

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  height: 80px;
  padding: 0 50px;
  background-color: black;
  z-index: 99999;
`;

const AnimateLogo = motion(LogoSVG);

const Logo = styled(AnimateLogo)`
  width: 150px;
  margin-right: 50px;
  filter: invert(16%) sepia(89%) saturate(6054%) hue-rotate(358deg)
    brightness(97%) contrast(113%);
  cursor: pointer;
`;

const AnimateSearchIcon = motion(SearchSVG);

const SearchIcon = styled(AnimateSearchIcon)`
  width: 25px;
  height: 25px;
  filter: invert();
  cursor: pointer;
  z-index: 1;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
`;

const Item = styled.li`
  margin-right: 20px;
  position: relative;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: red;
`;

const Input = styled(motion.input)`
  transform-origin: right;
  position: absolute;
  left: -180px;
  background: none;
  border: 1px solid #615f5fac;
  width: 200px;
  height: 40px;
  color: white;
  padding-left: 40px;
  border-radius: 5px;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export default Header;
