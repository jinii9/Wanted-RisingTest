
// 채용공고 필터링 조회
async function selectjobPosting(connection, jobCategoryId, dutyCategoryIds, country, locations, years, skill_tags, job_sort, user_tags) { //dutyCategoryIds, country, locations, years, skill_tags, job_sort, user_tags
    console.log(jobCategoryId, dutyCategoryIds, country, locations, years, skill_tags, job_sort, user_tags);

    
    let string_job = "";
    let string_duty = ` NOT CompanyDuties.dutyCategory_no IS NULL`;
    let string_country = ` NOT Companies.country IS NULL`;
    let string_location = ` NOT Companies.location IS NULL`;
    let string_sort = "";
    let string_tag = ` NOT CompanyTags.companyTagCategory_no IS NULL`;
    //let string_duty = `NOT CompanyDuties.dutyCategory_no IS NULL`;
    //let job = jobCategoryId;
    //let where_sql_jobCategory = `jobCategory_no = ${jobCategoryId}`
    //let where_sql_dutyCategory = `dutyCategory_no = ${dutyCategoryIds}`
    //let or_where_sql_dutyCategory = `OR dutyCategory_no = ${dutyCategoryIds}`
    
    /////////////////////////// jobCategoryId ///////////////////////////
    // 직군 전체일 경우 (jobCategoryId = 1)
    if(jobCategoryId == 1){
        //string += "";
        string_job += `NOT CompanyDuties.dutyCategory_no IS NULL` 
    }
    else { // 직군 하나 선택(개발)일 경우
        const jobCategoryId_arr = [];
        jobCategoryId_arr.push(jobCategoryId)
        console.log(jobCategoryId_arr)

        jobCategoryId_arr.map((item, idx)=> {
            if(idx === 0) { // 하나일 떄
                string_job += `jobCategory_no = ${item}`;
            }
        });
    }
    /////////////////////////// dutyCategoryIds ///////////////////////////
    if(dutyCategoryIds){
        //console.log(dutyCategoryIds)
        if(dutyCategoryIds != 1){ // (직무 전체 제외)직무 1개 이상일 경우
            console.log("!!!!!!!!!!!!!!!!!!")

            let dutyCategoryIds_arr = [];
            //console.log(dutyCategoryIds)

            if(!Array.isArray(dutyCategoryIds)){ // 직무 1개일 때
                dutyCategoryIds_arr.push(dutyCategoryIds)
            } else { // 직무 2개 이상일 때
                //dutyCategoryIds_arr = dutyCategoryIds;
                for(i=0; i<dutyCategoryIds.length; i++){ dutyCategoryIds_arr[i] = dutyCategoryIds[i]}
            }
            console.log(dutyCategoryIds_arr)

            dutyCategoryIds_arr.map((item, idx)=> {
                if(idx === 0) { // 하나일 때
                    string_duty = `dutyCategory_no = ${item}`;
                } else { // 둘 이상일 때
                    string_duty += ` OR dutyCategory_no = ${item}`;
                }
            })

        }
    }
    /////////////////////////// Country(국가) ///////////////////////////
    if(country){
        // 한국 선택 시, 한국 전국으로 검색
        //const countrySplit = [];
        //countrySplit = country.split('.');
        
        let country_arr = [];
        //country_arr = country.split('.');
        country_arr.push(country)
        console.log(country_arr)

        country_arr.map((item, idx)=> {
            if(idx === 0) { // 하나일 떄
                string_country = `Companies.country = '${item}'`;
            }
        });
    }
    /////////////////////////// locations(서울.전체 / 서울.강남구 or 서울.관악구 ..) ///////////////////////////
    if(locations){
        let locations_arr = [];
        //locations_arr = locations.split('.');

        if(!Array.isArray(locations)){ // locations 1개일 때
            locations_arr.push(locations)
        } else { // locations 2개 이상일 때
            for(i=0; i<dutyCategoryIds.length; i++){ locations_arr[i] = locations[i]}
        }
        console.log(locations_arr)

        locations_arr.map((item, idx)=> {
            
            let locationSplit = [];
            locationSplit = item.split('.');
            console.log(locationSplit[0] + ',,,' + locationSplit[1]);
            
            if(idx === 0) { // 하나일 때
                // 
                // let locationSplit = [];
                // locationSplit = item.split('.');
                // console.log(locationSplit[0] + ',,,' + locationSplit[1]);
                if(locationSplit[0] === '전국'){
                    string_location = ` NOT Companies.location IS NULL`;
                } else if(locationSplit[1] === '전체'){ // 서울.전체일 때
                    string_location = `(location = '${locationSplit[0]}')`;
                } else { // 서울.전체 아닐 때
                    string_location = `(location = '${locationSplit[0]}' AND workArea Like '%${locationSplit[1]}%')`;
                }
            
            
            } else { // 둘 이상일 때
                string_location += `OR (location = '${locationSplit[0]}' AND workArea Like '%${locationSplit[1]}%')`;
            }
        })
    }
    /////////////////////////// sort(popularity_order / latest_order) ///////////////////////////
    if(job_sort){
        const job_arr = [];
        job_arr.push(job_sort)
        console.log(job_arr)

        job_arr.map((item, idx)=> {
            if(idx === 0) { // 하나일 떄
                if(item === 'popularity_order') string_sort = `ORDER BY likeCount DESC`;
                if(item === 'latest_order') string_sort = `ORDER BY CompanyDuties.updatedAt`;
            
            }
        });

    }
    /////////////////////////// 태그(CompanyTagCategory_no) ///////////////////////////
    if(user_tags){
        let tag_arr = [];
        if(!Array.isArray(user_tags)){ // 태그 1개일 때
            tag_arr.push(user_tags)
        } else { // 태그 2개 이상일 때
            for(i=0; i<user_tags.length; i++){ tag_arr[i] = user_tags[i]}
        }
        console.log(tag_arr)

        tag_arr.map((item, idx)=> {
            if(idx === 0) { // 하나일 때
                string_tag = `companyTagCategory_no = ${item}`;
            } else { // 둘 이상일 때
                string_tag += ` OR companyTagCategory_no = ${item}`;
            }
        })

    }
    
    //console.log(string_job + " ");
    //console.log(string_duty);
    //console.log(string_country);
    //console.log(string_location);
    console.log(string_tag);
    //where_sql_dutyCategory = string;

    



    const selectJobPostingQuery = `
        SELECT DISTINCT Companies.no,
            jobCategory_no,
            dutyCategory_no,
            workArea,
            likeCount,
            companyImageUrl,
            title,
            Companies.name,
            location, country
        FROM Companies
                INNER JOIN CompanyImage ON Companies.no = CompanyImage.company_no
                INNER JOIN CompanyDuties ON Companies.no = CompanyDuties.company_no
                INNER JOIN DutyCategories ON DutyCategories.no = CompanyDuties.dutyCategory_no
                INNER JOIN CompanyTags ON Companies.no = CompanyTags.company_no
        WHERE (${string_job})
        AND (${string_duty})
        AND (${string_country})
        AND (${string_location})
        AND (${string_tag})
        AND main = 'Y'
        ${string_sort}
        ;
    `;

    const result = await connection.query(selectJobPostingQuery);
    


    return result[0];
}


  module.exports = {
    selectjobPosting,
};
  ;