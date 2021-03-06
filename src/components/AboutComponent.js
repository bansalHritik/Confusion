import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Media,
} from "reactstrap";
import { Fade, Stagger } from "react-animation-components";

import { Link } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

function About(props) {
  function RenderLeader({
    leaderImg,
    leaderName,
    leaderDesignation,
    leaderDescription,
  }) {
    return (
      <div>
        <Media className="mt-5">
          <Media left href="#" className="mr-5">
            <Media object src={leaderImg} alt={leaderName} />
          </Media>
          <Media body>
            <Media heading>{leaderName}</Media>
            <p>{leaderDesignation}</p>
            <p>{leaderDescription}</p>
          </Media>
        </Media>
      </div>
    );
  }

  /**
   * This component renders a list of leaders with some animation
   *
   * @param {*} { leaders, leadersLoading, leadersErrMess } self explanatory
   * @returns list of Leaders
   */
  function LoadLeaders({ leaders, leadersLoading, leadersErrMess }) {
    if (leadersLoading) {
      return <Loading />;
    } else if (leadersErrMess) {
      return <h4>{leadersErrMess}</h4>;
    } else
      return (
        <div>
          {/*Since it is a list */}
          <ul className="list-unstyled">
            {/* for animation*/}
            <Stagger in>
              {leaders.leaders.map((leader) => {
                return (
                  <Fade in>
                    <li key={leader.id}>
                      <RenderLeader
                        leaderImg={baseUrl + leader.image}
                        leaderName={leader.name}
                        leaderDesignation={leader.designation}
                        leaderDescription={leader.description}
                      />
                    </li>
                  </Fade>
                );
              })}
            </Stagger>
          </ul>
        </div>
      );
  }

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>About Us</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>About Us</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12 col-md-6">
          <h2>Our History</h2>
          <p>
            Started in 2010, Ristorante con Fusion quickly established itself as
            a culinary icon par excellence in Hong Kong. With its unique brand
            of world fusion cuisine that can be found nowhere else, it enjoys
            patronage from the A-list clientele in Hong Kong. Featuring four of
            the best three-star Michelin chefs in the world, you never know what
            will arrive on your plate the next time you visit us.
          </p>
          <p>
            The restaurant traces its humble beginnings to
            <em>The Frying Pan</em>, a successful chain started by our CEO, Mr.
            Peter Pan, that featured for the first time the world's best
            cuisines in a pan.
          </p>
        </div>
        <div className="col-12 col-md-5">
          <Card>
            <CardHeader className="bg-primary text-white">
              Facts At a Glance
            </CardHeader>
            <CardBody>
              <dl className="row p-1">
                <dt className="col-6">Started</dt>
                <dd className="col-6">3 Feb. 2013</dd>
                <dt className="col-6">Major Stake Holder</dt>
                <dd className="col-6">HK Fine Foods Inc.</dd>
                <dt className="col-6">Last Year's Turnover</dt>
                <dd className="col-6">$1,250,375</dd>
                <dt className="col-6">Employees</dt>
                <dd className="col-6">40</dd>
              </dl>
            </CardBody>
          </Card>
        </div>
        <div className="col-12">
          <Card>
            <CardBody className="bg-faded">
              <blockquote className="blockquote">
                <p className="mb-0">
                  You better cut the pizza in four pieces because I'm not hungry
                  enough to eat six.
                </p>
                <footer className="blockquote-footer">
                  Yogi Berra,
                  <cite title="Source Title">
                    The Wit and Wisdom of Yogi Berra, P. Pepe, Diversion Books,
                    2014
                  </cite>
                </footer>
              </blockquote>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h2>Corporate Leadership</h2>
        </div>
        <div className="col-12">
          <Media list>
            <LoadLeaders
              leaders={props.leaders}
              leadersLoading={props.leaders.isLoading}
              leaderErrMess={props.leaders.errMess}
            />
          </Media>
        </div>
      </div>
    </div>
  );
}

export default About;