import { IonDatetime, IonPopover, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRouterLink, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { getAllCustomer, insertCustomer } from '../databaseHandler';
import { Customer } from '../models/Customer';
import './Home.css';

const Home: React.FC = () => {
  const [name, setName] = useState('')
  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')
  const [dateTrip, setDateTrip] = useState<string>()
  const [amountPeople, setAmountPeople] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [riskAssessment, setRiskAssessment] = useState('')

  // const [languages, setLanguages] = useState<string[]>([])
  // const [picture, setPicture] = useState('')
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);


  const setDateToInput = (e: any) => {
    const mydate = new Date(e.detail.value)
    setDateTrip(mydate.toLocaleDateString("en-GB"))
  }

  const fetchDataFromDB = async () => {
    const allCus = await getAllCustomer()
    setAllCustomers(allCus)
  }

  const saveHandler = async () => {

    const newCus: Customer = {
      'name': name, 'destination': destination,
      'description': description, 'dateTrip': dateTrip,
      'amountPeople': amountPeople, 'vehicle': vehicle, 'riskAssessment': riskAssessment
    }

    await insertCustomer(newCus)
    alert('Insert done!')
    fetchDataFromDB()
  }


  useEffect(() => {
    fetchDataFromDB()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"medium"}>
          <IonTitle>Manage Trip</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position='floating'>Name of trip</IonLabel>
          <IonInput onIonChange={e => setName(e.detail.value!)} required></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>Destination</IonLabel>
          <IonInput onIonChange={e => setDestination(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>Description</IonLabel>
          <IonInput onIonChange={e => setDescription(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>Date of the trip</IonLabel>
          <IonInput id='mydatepicker' value={dateTrip}></IonInput>
          <IonPopover keepContentsMounted={true} trigger='mydatepicker' triggerAction='click'>
            <IonContent>
              <IonDatetime onIonChange={e => setDateToInput(e)}></IonDatetime>
            </IonContent>
          </IonPopover>
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>Amount people</IonLabel>
          <IonInput onIonChange={e => setAmountPeople(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>Vehicle</IonLabel>
          <IonInput onIonChange={e => setVehicle(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>Risk assessment</IonLabel>
          <IonSelect onIonChange={e => setRiskAssessment(e.detail.value)}>
            <IonSelectOption value="Yes">Yes</IonSelectOption>
            <IonSelectOption value="No">No</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonButton onClick={saveHandler} expand='block' class='ion-margin'>Save</IonButton>
        <IonList>
          {allCustomers.map(c =>
            <IonItem key={c.id}>
              <IonLabel>
                <IonRouterLink routerLink={'/Detail/' + c.id}>{c.name}</IonRouterLink>
              </IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
