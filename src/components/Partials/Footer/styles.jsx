import styled from "styled-components";
import tw from "twin.macro";

export const FooterContainer = styled.footer`
  ${tw`relative z-10 bg-gradient-main dark:bg-none dark:bg-[#F5F8F8] shadow-md text-primary-3 pt-3 lg:pt-6`}
`;
export const TopContainer = styled.div`
  ${tw`flex items-start lg:flex-row flex-col gap-5 sm:gap-10 lg:gap-14 xl:gap-20 justify-between py-5 md:py-7 lg:py-10 container`}
`;
export const Top = styled.div`
  ${tw`md:flex flex-1 items-start justify-between grid grid-cols-2 sm:grid-cols-3 gap-y-4 w-full lg:w-auto xl:max-w-3xl`}
`;
export const CategoryContainer = styled.div`
  ${tw`col-span-1`}
  a {
    ${tw``}
  }
  a:nth-child(2) {
    ${tw`!mt-1 sm:mt-3`}
  }
`;
export const IconWrapper = styled.div`
  ${tw`grid grid-cols-3 gap-2 max-w-[145px]`}
`;
export const Name = styled.p`
  ${tw`py-1 text-lg text-white dark:text-primary-3 font-extrabold lg:h-8`};
`;
export const Icon = styled.a`
  ${tw`cursor-pointer`}
`;
export const LogoWrapper = styled.div`
  ${tw`flex flex-col gap-3 items-start justify-start max-w-md`}
`;

export const BotContainer = styled.div`
  ${tw`container flex justify-between items-center py-5 sm:py-8 md:flex-row flex-col gap-3 sm:gap-5`}
  .lazy-load-image-background {
    width: auto !important;
  }
`;
export const CenterContainer = styled.div`
  ${tw`container flex justify-between items-center bg-[#1e1f2580] dark:bg-gradient-button p-3 md:flex-row flex-col gap-3 sm:gap-5`};
  > p {
    ${tw`!text-white text-base text-center sm:text-lg sm:text-center`}
  }
`;
export const LeftSide = styled.div`
  ${tw`text-center text-white dark:text-primary-3`}
`;
export const RightSide = styled.div`
  ${tw`flex gap-x-3`}
  >span {
    cursor: pointer;
  }
`;
export const Text = styled.p`
  ${tw`text-white dark:text-primary-3 text-sm`}
`;
