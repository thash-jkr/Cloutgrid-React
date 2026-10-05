import logo from '@/assets/cloutgrid_logo_icon.png';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiConfig } from '@/app/apiConfig';
import toast from 'react-hot-toast';
import type { InstagramMediaModel, InstagramPageModel } from '@/types/integrationTypes';
import { IGMediaInsights, IGProfileInsights } from './Instagram';
import CloutEmpty from '@/components/CloutEmpty';
import instagramIcon from "@/assets/isometric/instagram_insight.png"

const Vitae = () => {
  const { username } = useParams();

  const [page, setPage] = useState<InstagramPageModel | null>(null);
  const [media, setMedia] = useState<InstagramMediaModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVitae = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${ApiConfig.baseUrl}/vitae/instagram/${username}/`);
        setPage(response.data.page);
        setMedia(response.data.media);
      } catch (error) {
        toast.error(`Error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVitae();
  }, []);

  return (
    <div className="container flex flex-col items-center justify-start min-h-lvh mx-auto p-5 w-full lg:w-2/3">
      <div className="flex justify-between items-center w-full">
        <img src={logo} alt="Cloutgrid logo" className="h-16 w-auto object-contain" />

        <h1 className="font-bold text-2xl">Clout Vitae</h1>

        <FontAwesomeIcon icon={faInstagram} style={{ fontSize: 35, color: 'red' }} />
      </div>

      {page == null && <CloutEmpty message="Instagram not connected" isLoading={isLoading} icon={instagramIcon} />}

      {page != null && <IGProfileInsights page={page} other={true} onSync={() => {}} />}
      {page != null && <IGMediaInsights mediaList={media} />}
    </div>
  );
};

export default Vitae;
