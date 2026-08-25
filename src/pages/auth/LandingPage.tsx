import NavBar from "@/components/NavBar";
import kidImage from "@/assets/kid.png";
import { faBriefcase, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, SegmentedButton, SegmentedButtonSet } from "actify";
import { useState } from "react";
import iOSLogo from "@/assets/app_store_logo.png";
import androidLogo from "@/assets/play_store_logo.png";
import { Link } from "react-router-dom";

interface EmojiIcon {
  codepoint: string;
  alt: string;
}

interface FeatureTileProps {
  label: string;
  icon: EmojiIcon;
}

function FeatureTile({ label, icon }: FeatureTileProps) {
  return (
    <div className="flex items-center justify-center gap-2 text-center">
      <picture>
        <source
          srcSet={`https://fonts.gstatic.com/s/e/notoemoji/latest/${icon.codepoint}/512.webp`}
          type="image/webp"
        />
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${icon.codepoint}/512.gif`}
          alt={icon.alt}
          width={25}
          height={25}
        />
      </picture>
      <p className="font-semibold">{label}</p>
    </div>
  );
}

export default function LandingPage() {
  const [type, setType] = useState("creator");

  return (
    <div className="container min-h-dvh  mx-auto">
      <NavBar />

      <main className="mx-auto flex min-h-dvh px-4">
        <div className="flex flex-col flex-1 justify-center items-center lg:items-start gap-5">
          <h1 className="text-3xl font-bold leading-tight w-full">
            <span className="text-primary">Clout</span>
            <span className="text-secondary">grid</span>
            <br />
            Where creators and brands
            <br />
            <span className="text-secondary">connect.</span>
          </h1>

          <div className="flex items-center w-full lg:w-1/2 gap-4">
            <SegmentedButtonSet
              role="presentation"
              className="w-full"
              aria-label="Color mode"
            >
              <div
                role="group"
                className="h-10 grid w-full grid-flow-col auto-rows-auto"
              >
                <SegmentedButton
                  title="Creator"
                  label="Creator"
                  data-value="creator"
                  className="rounded-l-full"
                  selected={type == "creator"}
                  icon={<FontAwesomeIcon icon={faVideo} />}
                  onPress={() => setType("creator")}
                />

                <SegmentedButton
                  title="Brand"
                  label="Brand"
                  data-value="brand"
                  className="rounded-r-full"
                  selected={type == "brand"}
                  icon={<FontAwesomeIcon icon={faBriefcase} />}
                  onPress={() => setType("brand")}
                />
              </div>
            </SegmentedButtonSet>
          </div>

          <div className="flex flex-col items-start gap-5 w-full">
            <FeatureTile
              label={
                type == "creator" ? "Unlimited campaigns" : "Post campaigns"
              }
              icon={{ codepoint: "1f680", alt: "🚀" }}
            />
            <FeatureTile
              label={
                type == "creator"
                  ? "Instagram & YouTube analytics"
                  : "Verified creator analytics"
              }
              icon={{ codepoint: "1f4ca", alt: "📊" }}
            />
            <FeatureTile
              label="Safe escrow payments"
              icon={{ codepoint: "1f4b8", alt: "💸" }}
            />
            <FeatureTile
              label={
                type == "creator"
                  ? "AI-powered brand matching"
                  : "AI-powered creator search"
              }
              icon={{ codepoint: "1fa84", alt: "🪄" }}
            />
          </div>

          <div className="flex h-14 w-full items-center justify-center mb-5 lg:w-1/2">
            {type == "creator" ? (
              <div className="flex w-3/4 lg:w-full mb-5 justify-center">
                <a
                  className="w-1/2 h-auto hover:scale-105 transition-all duration-500 cursor-pointer"
                  href="https://apps.apple.com/in/app/cloutgrid/id6745302913"
                >
                  <img src={iOSLogo} />
                </a>

                <a
                  className="w-1/2 h-auto hover:scale-105 transition-all duration-500 cursor-pointer"
                  href="https://play.google.com/store/apps/details?id=com.cloutgrid.androidapp"
                >
                  <img src={androidLogo} />
                </a>
              </div>
            ) : (
              <Link to="/register/brand">
                <Button>
                  <span>
                    Join{" "}
                    <span className="font-bold text-primary">
                      Clout<span className="text-secondary">grid</span>
                    </span>
                  </span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="hidden lg:flex flex-col flex-1 items-center justify-center">
          <img
            src={kidImage}
            alt="Cloutgrid illustration"
            className="w-full object-cover"
          />

          {/* <span className="flex items-center gap-3">
            Connect{" "}
            <span className="text-[7px]">
              <FontAwesomeIcon icon={faCircle} />
            </span>
            Create{" "}
            <span className="text-[7px]">
              <FontAwesomeIcon icon={faCircle} />
            </span>
            Collaborate
          </span> */}
        </div>
      </main>
    </div>
  );
}
