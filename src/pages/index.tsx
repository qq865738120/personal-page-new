import * as React from "react";
import "./home.scss";
import Bg1 from "../images/bg-1.svg";
import Bg2 from "../images/bg-2.svg";
import { useSelector } from "react-redux";
import {
  Card,
  Image,
  Timeline,
  Text,
  Title,
  Badge,
  Space,
  SimpleGrid,
  ScrollArea,
  Progress,
  Highlight,
  Modal,
} from "@mantine/core";
import { Prism } from "@mantine/prism";
import {
  companyList,
  infoList,
  menu,
  projectList,
  schoolList,
  skillList,
} from "../common/home_data";
import { useMediaQuery, useScrollIntoView } from "@mantine/hooks";
import { ResponsiveTreeMap } from "@nivo/treemap";
import axios from "axios";
import { useNotifications } from "@mantine/notifications";
import { isBrowser } from "../utils/index";
import AsciinemaPlayer from "../lib/asciinema-player";

// markup
const IndexPage = () => {
  // const currentTheme = useSelector(state => state.theme);
  const [menuIndex, setMenuIndex] = React.useState(0);
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [isOpenImagePreview, setIsOpenImagePreview] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState<any>({});
  const isPhone = useMediaQuery("(max-width: 760px)");
  const notifications = useNotifications();
  const scrollIntoView1 = useScrollIntoView({ offset: 80 });
  const scrollIntoView2 = useScrollIntoView({ offset: 80 });
  const scrollIntoView3 = useScrollIntoView({ offset: 80 });
  const scrollIntoView4 = useScrollIntoView({ offset: 80 });
  const scrollIntoView5 = useScrollIntoView({ offset: 80 });
  const scrollIntoView6 = useScrollIntoView({ offset: 80 });

  React.useEffect(() => {
    const player = [];
    if (isBrowser()) {
      projectList
        .filter((item) => item.player)
        .map((item) => {
          player.push(
            AsciinemaPlayer({}).create(
              `https://asciinema.org/a/${item.player}.cast`,
              document.getElementById(item.player),
              {
                loop: true,
                autoPlay: true,
                idleTimeLimit: 1,
                theme: "solarized-light",
                cols: isPhone ? 47 : 90,
                rows: isPhone ? 24 : 42,
              }
            )
          );
        });
    }

    return () => {
      player.map((item) => item && item.dispose());
    };
  }, []);

  React.useEffect(() => {
    getAccess();
  }, []);

  const getAccess = React.useCallback(async () => {
    try {
      const res = await axios.get(
        "https://server.ddnszwj.top/api/v1/personal-page/access"
      );
      if (res.data) {
        notifications.showNotification({
          title: "??????",
          message: `??????????????????????????????????????????${res.data.data}????????????`,
        });
      } else {
        notifications.showNotification({
          icon: (
            <i
              className="icon icon-close"
              style={{ fontSize: "16px", color: "white" }}
            />
          ),
          color: "red",
          message: `??????????????????????????????????????????????????????`,
        });
      }
    } catch (error) {
      notifications.showNotification({
        icon: (
          <i
            className="icon icon-close"
            style={{ fontSize: "16px", color: "white" }}
          />
        ),
        color: "red",
        message: `??????????????????????????????????????????????????????`,
      });
      console.error(error);
    }
  }, []);

  const onMenuClick = React.useCallback(() => {
    setIsOpenMenu(!isOpenMenu);
  }, [isOpenMenu]);

  const onNavigationClick = React.useCallback((index) => {
    console.log("index", index);
    setMenuIndex(index);
    if (index < 2) {
      scrollIntoView1.scrollIntoView();
    } else {
      [
        scrollIntoView1,
        scrollIntoView2,
        scrollIntoView3,
        scrollIntoView4,
        scrollIntoView5,
        scrollIntoView6,
      ][index - 1].scrollIntoView();
    }
    setIsOpenMenu(false)
  }, []);

  const onImageClick = React.useCallback((item) => {
    setImagePreview(item);
    setIsOpenImagePreview(true);
  }, []);

  return (
    <main className={`index-page`}>
      <section className="head">
        <div
          className={`menu ${isOpenMenu ? "open-menu" : ""}`}
          onClick={onMenuClick}
        />
        <div className="left">
          <img src="../../icon.webp" />
          <span>CODE_XIA</span>
        </div>
        <div className="center center-pc">
          {menu.map((item, index) => (
            <a
              className={index === menuIndex ? "active" : ""}
              key={item.text}
              onClick={onNavigationClick.bind(this, index)}
            >
              {item.text}
            </a>
          ))}
        </div>
        {isOpenMenu && (
          <div className="center center-mobile">
            {menu.map((item, index) => (
              <a
                className={index === menuIndex ? "active" : ""}
                key={item.text}
                onClick={onNavigationClick.bind(this, index)}
              >
                {item.text}
              </a>
            ))}
          </div>
        )}
        <div></div>
      </section>

      <section className="part-1" ref={scrollIntoView1.targetRef}>
        <div className="top">
          <img src="../../head.webp" />
          <p className="title">?????????</p>
          <p className="desc">?????????????????????</p>
        </div>
        <Highlight className="content" highlight={["5???"]}>
          ??????5????????????????????????????????????React???Vue????????????????????????????????????nodejs???Java???????????????????????????????????????RN???flutter???Taro???????????????Android????????????????????????????????????????????????????????????????????????????????????Webpack???Rollup???Babel???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        </Highlight>
        <div className="center">
          {infoList.map((item) => (
            <div key={item.icon} className="item">
              <i className={`icon ${item.icon}`} />
              <div>
                <p className="title">{item.title}</p>
                <p className="desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="part-2">
        <div className="bg-1">
          <Bg1 />
        </div>
        <div className="body">
          <h2>??????</h2>
          <div className="box-1" ref={scrollIntoView2.targetRef as any}>
            <h3>????????????</h3>
            <div className="item-warp">
              {companyList.map((item) => (
                <div className="item" key={item.name}>
                  <Card shadow="sm" padding="lg">
                    <Card.Section>
                      <Image src={item.image} height={200} alt="Norway" />
                    </Card.Section>
                    <p className="title">{item.name}</p>
                    <Timeline
                      className="desc"
                      color="teal"
                      active={4}
                      bulletSize={24}
                      lineWidth={2}
                    >
                      {item.infos.map((it) => (
                        <Timeline.Item
                          key={it.name}
                          bullet={<i className={`icon ${it.icon}`} />}
                          title={it.name}
                        >
                          <Text color="dimmed" size="sm">
                            {it.detail}
                          </Text>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="box-2" ref={scrollIntoView3.targetRef as any}>
            <h3>??????</h3>
            <div className="item-warp">
              <div className="left">
                {schoolList.map((item) => (
                  <div key={item.name}>
                    <Text weight={500} size="lg" style={{ color: "#1a1b1e" }}>
                      {item.name}???
                    </Text>
                    <Text size="lg" style={{ color: "#747f8a" }}>
                      {item.value}
                    </Text>
                  </div>
                ))}
              </div>
              <div className="right">
                <Image
                  src={"../../school.webp"}
                  height={450}
                  width={700}
                  alt="Norway"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="part-3">
        <div className="bg-1 bg-2">
          <Bg2 />
        </div>
        <div className="body">
          <h2>??????</h2>
          <div className="box-1" ref={scrollIntoView4.targetRef as any}>
            <h3>??????</h3>
            {projectList.map((item) => (
              <div key={item.name} className="item">
                <div className="top">
                  <Title order={4}>{item.name}</Title>
                  <div className="line">
                    <Text
                      weight={500}
                      size="lg"
                      style={{ color: "#1a1b1e", flexShrink: "0" }}
                    >
                      ?????????
                    </Text>
                    <Text size="lg" style={{ color: "#747f8a" }}>
                      {item.nature}
                    </Text>
                  </div>
                  <div className="line" style={{ alignItems: "center" }}>
                    <Text
                      weight={500}
                      size="lg"
                      style={{ color: "#1a1b1e", flexShrink: "0" }}
                    >
                      ?????????
                    </Text>
                    <div>{item.duty}</div>
                  </div>
                  <div className="line">
                    <Text
                      weight={500}
                      size="lg"
                      style={{ color: "#1a1b1e", flexShrink: "0" }}
                    >
                      ?????????
                    </Text>
                    <Text size="lg" style={{ color: "#747f8a" }}>
                      {item.detail}
                    </Text>
                  </div>
                  <div className="line">
                    <Text
                      weight={500}
                      size="lg"
                      style={{ color: "#1a1b1e", flexShrink: "0" }}
                    >
                      ????????????
                    </Text>
                    <div>{item.technologies}</div>
                  </div>
                  {item.codeLink && (
                    <div className="line">
                      <Text
                        weight={500}
                        size="lg"
                        style={{ color: "#1a1b1e", flexShrink: "0" }}
                      >
                        ????????????
                      </Text>
                      <Text
                        variant="link"
                        component="a"
                        href={item.codeLink}
                        size="lg"
                        style={isPhone ? { wordBreak: "break-all", maxWidth: '270px' } : {}}
                      >
                        ????????????
                      </Text>
                    </div>
                  )}
                </div>
                <SimpleGrid className="center" cols={2} spacing="lg">
                  <div className="left">
                    {item.images ? (
                      <>
                        <Image
                          radius="md"
                          className="first-image"
                          src={`https://minio.ddnszwj.top/web/personal-page/${item.images[0].thumb}`}
                          height={300}
                          onClick={onImageClick.bind(this, item.images[0])}
                        />
                        <SimpleGrid
                          cols={2}
                          spacing="xs"
                          style={{ marginTop: "10px" }}
                        >
                          {item.images.map(
                            (it, index) =>
                              index !== 0 && (
                                <Image
                                  radius="md"
                                  className="image"
                                  src={`https://minio.ddnszwj.top/web/personal-page/${it.thumb}`}
                                  key={it.thumb}
                                  height={200}
                                  onClick={onImageClick.bind(this, it)}
                                />
                              )
                          )}
                        </SimpleGrid>
                      </>
                    ) : (
                      <div id={item.player} className="preview"></div>
                    )}
                  </div>
                  <ScrollArea className="right">
                    <Prism
                      className="right"
                      language={item.code.language as any}
                    >
                      {item.code.text}
                    </Prism>
                  </ScrollArea>
                </SimpleGrid>
              </div>
            ))}
          </div>
          <div className="box-2" ref={scrollIntoView5.targetRef as any}>
            <h3>??????</h3>
            <div className="content">
              {isBrowser() && (
                <ResponsiveTreeMap
                  data={skillList}
                  identity="name"
                  value="loc"
                  valueFormat=" >-0.0%"
                  label={(e) => e.id + " (" + e.formattedValue + ")"}
                  labelSkipSize={12}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.2]],
                  }}
                  parentLabelTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                  colors={{ scheme: "nivo" }}
                  borderColor="#ffffff"
                />
              )}
            </div>
          </div>
          <div className="box-3" ref={scrollIntoView6.targetRef as any}>
            <h3>??????</h3>
            <SimpleGrid className="content" cols={2} spacing="lg">
              <div className="right">
                <Image
                  src="https://minio.ddnszwj.top/web/personal-page/lanqiaobei.jpg"
                  alt="Norway"
                />
              </div>
              <div className="left">
                <Title order={4}>???????????????????????????</Title>
                <div style={{ marginTop: '16px' }}>
                  <Text>
                    ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????IT??????????????????????????????????????????????????????????????????????????????1200?????????????????????????????????????????????40?????????
                  </Text>
                  <Text>
                    2020???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                  </Text>
                </div>
              </div>
            </SimpleGrid>
          </div>
        </div>
      </section>

      <Modal
        opened={isOpenImagePreview}
        onClose={() => setIsOpenImagePreview(false)}
        size={isPhone ? 340 : (imagePreview.width + 40)}
        title="????????????"
      >
        <Image width={isPhone ? 300 : imagePreview.width} src={"https://minio.ddnszwj.top/web/personal-page/" + imagePreview.thumb} />
      </Modal>
    </main>
  );
};

// export const query = graphql`
//   # query will go here
// `;

export default IndexPage;
