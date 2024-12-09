import {defineField,defineType} from "sanity"


export const comment = defineType({

    name: "comment",
    title: "Comment",
    type: "document",
    fields: [
       defineField({
        name : "description",
        type : "string",
        validation : (Rule) => Rule.required()
       }),
       defineField({
        name : "author",
        type : "reference",
        to : {type : "author"}
       }),
       defineField({
        name : "startup",
        type : "reference",
        to : {type : "startup"}
       }),

    ],
    
})