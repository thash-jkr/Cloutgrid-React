import NavBar from '@/components/NavBar';
import hero from '@/assets/animations/hero.json'
import { Lottie } from "lottie-react";
import { Button, SegmentedButtonSet } from 'actify';
import { useState } from 'react';
import iOSLogo from '@/assets/app_store_logo.png';
import androidLogo from '@/assets/play_store_logo.png';
import { Link } from 'react-router-dom';
import { Briefcase, Palette } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

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
  const [isCreator, setIsCreator] = useState(true);

  return (
    <div className="container min-h-lvh mx-auto noselect">
      <NavBar />

      <main className="mx-auto flex min-h-lvh px-4">
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
            <SegmentedButtonSet role="presentation" className="w-full" aria-label="Color mode">
              <div role="group" className="h-10 grid w-full grid-flow-col auto-rows-auto">
                <div className="flex h-10 w-full overflow-hidden rounded-full border border-gray-300">
                  <button
                    type="button"
                    onClick={() => setIsCreator(true)}
                    className={`flex flex-1 items-center justify-center gap-2 text-sm font-medium transition-colors ${
                      isCreator ? 'bg-primary text-white' : 'bg-white text-gray-700'
                    }`}
                  >
                    <Palette className="h-4 w-4" />
                    Creator
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreator(false)}
                    className={`flex flex-1 items-center justify-center gap-2 text-sm font-medium transition-colors ${
                      !isCreator ? 'bg-secondary text-white' : 'bg-white text-gray-700'
                    }`}
                  >
                    <Briefcase className="h-4 w-4" />
                    Brand
                  </button>
                </div>
              </div>
            </SegmentedButtonSet>
          </div>

          <div className="flex flex-col items-start gap-5 w-full">
            <FeatureTile
              label={isCreator ? 'Unlimited campaigns' : 'Post campaigns'}
              icon={{ codepoint: '1f680', alt: '🚀' }}
            />
            <FeatureTile
              label={isCreator ? 'Instagram & YouTube analytics' : 'Verified creator analytics'}
              icon={{ codepoint: '1f4ca', alt: '📊' }}
            />
            <FeatureTile label="Safe escrow payments" icon={{ codepoint: '1f4b8', alt: '💸' }} />
            <FeatureTile
              label={isCreator ? 'AI-powered brand matching' : 'AI-powered creator search'}
              icon={{ codepoint: '1fa84', alt: '🪄' }}
            />
          </div>

          <div className="flex h-14 w-full items-center justify-center md:w-2/3 lg:w-1/2">
            {isCreator ? (
              <div className="flex w-3/4 lg:w-full mt-5 justify-center">
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
                    Join{' '}
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
          <Lottie src={hero} autoplay loop />
        </div>
      </main>

      <footer className="container mx-auto flex flex-wrap justify-center content-center mb-8 w-full">
        <div className="px-2 py-3 flex flex-col justify-center content-center items-center w-full">
          <div className="flex justify-between content-center py-5 w-2/3 md:w-3/5 lg:w-1/5 text-3xl">
            <a
              href="https://facebook.com/cloutgrid"
              className="transition-all duration-500 hover:scale-110 hover:text-orange-500"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://instagram.com/cloutgrid"
              className="transition-all duration-500 hover:scale-110 hover:text-orange-500"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://youtube.com/cloutgrid"
              className="transition-all duration-500 hover:scale-110 hover:text-orange-500"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://x.com/cloutgrid"
              className="transition-all duration-500 hover:scale-110 hover:text-orange-500"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
          </div>

          <div className="flex justify-center content-center font-bold text-lg md:w-3/4 py-5">
            <ul className="flex flex-col lg:flex-row justify-between content-center text-center w-full">
              <li className="transition-all duration-500 hover:scale-110 hover:text-orange-500">
                <a href="mailto:info@cloutgrid.com">Contact us</a>
              </li>
              {/* <li>
              <a href="/">Our Services</a>
            </li> */}
              <li className="transition-all duration-500 hover:scale-110 hover:text-orange-500">
                <Link to={'/privacypolicy'}>Privacy Policy</Link>
              </li>

              <li className="transition-all duration-500 hover:scale-110 hover:text-orange-500">
                <Link to={'/eula'}>Terms of Service</Link>
              </li>

              <li className="transition-all duration-500 hover:scale-110 hover:text-orange-500">
                <Link to={'/deletionpolicy'}>Data Deletion</Link>
              </li>

              {/* <li>
              <a href="/">Careers</a>
            </li> */}
            </ul>
          </div>

          <div className="flex flex-col justify-center content-center text-center py-5">
            <p>Cloutgrid Copyright © 2026 Cloutgrid - All rights reserved</p>
            {/* <p className="font-bold transition-all duration-500 hover:scale-110 hover:text-orange-500">
              Designed By: <a href="https://thash.me">@thash</a>
            </p> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
