import prisma from '~/utils/prisma';

export default eventHandler(async (event) => {

    const body = await readBody(event)

        // @ts-ignore
    const updateCat = await prisma.cat.update({
        where: {
            id: body.id,
        },
        data: {
            // @ts-ignore
            name: body.name,
            description: body.description,
            sexe: body.sexe,
            dateofbirth: body.dateOfBirth,
        },
    })

})
