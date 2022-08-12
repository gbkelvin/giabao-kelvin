import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as FB_SERVICES from "../../../FirebaseServices/FirebaseService";

import "./Client.css";

const Client = () => {
  const { t, i18n } = useTranslation("translation");
  const [clients, setClients] = useState([]);
  useEffect(() => {
    FB_SERVICES.getClientDocument().then((clients) => setClients(clients));
  }, []);

  return (
    <div className="client--container">
      <div className="client--header">{t("ourClient")}</div>
      <div className="client--logo__container">
        {clients.map((client) => {
          return (
            <div className="client--box" key={client.id}>
              <img
                alt="client logo"
                src={client.client_logo}
                className="client-logo"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Client;
