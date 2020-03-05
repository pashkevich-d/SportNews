import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import './Page.css';
import axios from 'axios';

const Page: React.FC<RouteComponentProps<{ name: string; }>> = ({ match }) => {

  const [articles, setArticles] = useState([]);
  const items: any[] = [];

  useEffect(()=>{
    fetchArticles().then(data=>setArticles(data.articles))
  }, [])

  const API_KEY = "6b9340b84e06416094a1157d0f94e524";
  const URL = `https://newsapi.org/v2/top-headlines?country=ru&category=sports&apiKey=${API_KEY}`;

  const fetchArticles = () => {
    return axios({
      url: URL,
      method: 'get'
    }).then(response=>{
      console.log(response);
      return response.data
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{match.params.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent >
        <IonList>
          {articles.map((article, i)=> {
            return (
              <IonItem key={i}>
                {article['title']}
                <IonButton href={article['url']} color="success" slot="end">Read</IonButton>
              </IonItem>
            )
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Page;
