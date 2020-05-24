import { shade } from 'polished';
import styled from 'styled-components';

import arrowLeft from '../../assets/arrow-right.png';
import arrowRight from '../../assets/arrow-left.png';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #232129;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #dedede;
      width: 24px;
      height: 24px;
    }
  }

  a {
    text-decoration: none;
    color: #dedede;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #666360;
    }

    strong {
      color: #f4ede8;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #dedede;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #dedede;
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #666360;
    font-size: 20px;
    font-weight: 400;
  }

  section {
    background: #3e3e3e;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;
    box-shadow: 0px 0px 10px 5px #232129;

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      content: '';
      background: #dedede;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #dedede;
    }

    div {
      font-size: 18px;
      span {
        margin-left: 24px;
        margin-top: 8px;
        font-weight: 500;
      }
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #7e7e7e;

      svg {
        color: #dedede;
        margin-right: 8px;
      }
    }
  }

  button {
    background: transparent;
    border: 0;
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #7e7e7e;

    svg {
      color: #dedede;
      margin-right: 8px;
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #666360;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3e3e;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #7e7e7e;
    width: 70px;

    svg {
      color: #dedede;
      margin-right: 8px;
    }
  }
`;

export const UserAppointment = styled.div`
  flex: 1;
  background: #3e3e3e;
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-radius: 10px;
  margin-left: 24px;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  strong {
    margin-left: 24px;
    color: #dedede;
    font-size: 20px;
  }

  button {
    background: transparent;
    border: 0;
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #7e7e7e;

    svg {
      color: #dedede;
      margin-right: 8px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  > strong {
    margin-bottom: 24px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    letter-spacing: 1px;
  }

  .DayPicker {
    background: #232129;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 0px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Caption {
    background: #7e7e7e;
    height: 50px;
    padding: 0;
    border-radius: 10px 10px 0px 0px;

    div {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .DayPicker-NavButton--prev {
    left: 1.5em;
    top: 0.8em;
    background-image: url(${arrowLeft});
    background-size: 16px;
  }

  .DayPicker-NavButton--next {
    right: 1.5em;
    top: 0.8em;
    background-image: url(${arrowRight});
    background-size: 16px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3e3e;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3E3E3E')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #dedede !important;
    border-radius: 10px;
    color: #7e7e7e !important;
  }
`;
