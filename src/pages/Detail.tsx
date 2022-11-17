import { IonRouterLink, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { deleteCustomerById, getCustomerById } from '../databaseHandler';
import { Customer } from '../models/Customer';
import './Home.css';

import { trash } from 'ionicons/icons'

interface IdParam {
  id: string
}

const Detail: React.FC = () => {
  const [name, setName] = useState('')
  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')
  const [dateTrip, setDateTrip] = useState<string>()
  const [amountPeople, setAmountPeople] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [riskAssessment, setRiskAssessment] = useState('')

  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const { id } = useParams<IdParam>()

  const deleteHandle = async () => {

    await deleteCustomerById(Number.parseInt(id))
    alert('Delete done!')
    fetchDataFromDB()
    
  }

  const fetchDataFromDB = async () => {
    const cus = await getCustomerById(Number.parseInt(id)) as Customer
    setName(cus.name)
    setDestination(cus.destination)
    setDescription(cus.description)
    setDateTrip(cus.dateTrip)
    setAmountPeople(cus.amountPeople)
    setVehicle(cus.vehicle)
    setRiskAssessment(cus.riskAssessment)

  }
  useEffect(() => {
    fetchDataFromDB()
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonButton href='/Home' color="danger" slot="end" onClick={deleteHandle}>

              <IonIcon slot="icon-only" icon={trash}> </IonIcon>

          </IonButton>
          <IonTitle>Customer Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Name of trip</IonLabel>
          <IonInput value={name}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Destination</IonLabel>
          <IonInput value={destination}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <IonInput value={description}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Date of the trip</IonLabel>
          <IonInput value={dateTrip}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Amount people</IonLabel>
          <IonInput value={amountPeople}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Vehicle</IonLabel>
          <IonInput value={vehicle}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Risk assessment</IonLabel>
          <IonSelect value={riskAssessment}>
            <IonSelectOption value="Yes">Yes</IonSelectOption>
            <IonSelectOption value="No">No</IonSelectOption>
          </IonSelect>
        </IonItem>

      </IonContent>
    </IonPage>
  );
};
export default Detail;
