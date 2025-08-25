import asyncHandler from "express-async-handler"
import { Contact } from "../models/contactModel.js"
import mongoose from "mongoose"

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contacts)
})
const createContact = asyncHandler(async(req, res) => {
    const { name, email, phone } = req.body
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(200).json(contact)
})

const updateContact = asyncHandler(async(req, res) => {
    const id = req.params.id
        // Check if it's a valid MongoDB ObjectId
    const contact = await Contact.findById(id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("Unauthorized Access")
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json(updatedContact)
})
const deleteContact = asyncHandler(async(req, res) => {
    const id = req.params.id
    const contact = await Contact.findById(id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("Unauthorized Access")
    }
    await Contact.findByIdAndDelete(id)
    res.status(200).json({ message: `Contact deleted successfully` })
})
const getContact = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("Unauthorized Access")
    }
    res.status(200).json(contact);
});
export { getContacts, createContact, updateContact, deleteContact, getContact }