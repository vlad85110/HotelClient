import {Button, Container} from "react-bootstrap";
import Modal from "../../modal/Modal";
import React, {useEffect, useState} from "react";
import RoomTypeForm from "./form/RoomTypeForm";
import {Api} from "../../../api/Api";
import RoomType from "./room_type/RoomType";

export function RoomTypes() {
    const [typeCreateModal, setTypeCreateModal] = useState(false);
    const [typeEditModal, setTypeEditModal] = useState(false);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        Api.getAllTypes().then(r => setTypes(r.data))
    }, []);

    const editRoomType = async (people) => {
        let res = await Api.editRoomType(people)

        let name = true
        if (res === undefined) {
            name = false
        }

        res = await Api.getAllTypes()
        setTypes(res.data)

        return {
            name: name
        }
    }

    const showEditType = (type) => {
        setTypeEditModal(true)
        const typeNameField = document.getElementById("typeNameEdit")
        const bedCntEdit = document.getElementById("bedCntEdit")
        const costEdit = document.getElementById("costEdit")
        const typeId = document.getElementById("typeIdEdit")

        typeNameField.value = type.name
        bedCntEdit.value = type.bedCnt
        typeId.value = type.id
        costEdit.value = type.cost
    }

    const deleteRoomType = async (type) => {
        let res = await Api.deleteRoomType(type.id)

        if (res === undefined) {
            alert("Нельзя удалить тип, к нему привязаны номера")
        }

        res = await Api.getAllTypes()
        setTypes(res.data)
    }

    const addType = async (type) => {
        let res = await Api.addType(type)

        let name = true
        if (res === undefined) {
            name = false
        }

        Api.getAllTypes().then(r => setTypes(r.data))

        return {
            name: name
        }
    }

    return (
        <Container>
            <h2> Категории номеров </h2>
            <Button onClick={() => setTypeCreateModal(true)}>Добавить категорию</Button>

            {types.map(type => <RoomType params={type} setTypes={setTypes} key={type.id}
                                         showEditType={() => showEditType(type)} deleteType={deleteRoomType}/>)}

            <Modal visible={typeCreateModal} setVisible={setTypeCreateModal}>
                <RoomTypeForm validate={addType} visible={typeCreateModal} setVisible={setTypeCreateModal}/>
            </Modal>

            <Modal visible={typeEditModal} setVisible={setTypeEditModal}>
                <RoomTypeForm validate={editRoomType} visible={typeEditModal} setVisible={setTypeEditModal} id="Edit"/>
            </Modal>
        </Container>
    )
}