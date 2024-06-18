const fs = require('fs');
const path = require('path');
/**
 * 同步删除文件子文件及子目录
 * @param {string} dirPath 目录绝对路径 
 * @param {string} includesKey 只删除含有的key 
 * @param {string} deleteCur 是否删除传入目录 
 */
const removeDirRecursive = (dirPath, includesKey='', deleteCur=false) => {
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        files.forEach((file) => {
            const curPath = path.join(dirPath, file);
            console.log('inini',curPath)
            if(includesKey && !curPath.includes(includesKey)){ // 不含有则不删除了 
                return;
            }
            console.log('inini')
            if (fs.statSync(curPath).isDirectory()) {
                // 递归删除子目录
                removeDirRecursive(curPath, includesKey, true);
            } else {
                // 删除文件
                fs.unlinkSync(curPath);
            }
        });
        if(deleteCur){
            try{
                fs.rmdirSync(dirPath); // 只能删除空目录,非空会报错
                console.log(`目录 ${dirPath} 已成功删除。`);
            }catch(err){
                console.warn(`${dirPath} 目录不为空, 删除失败, 如果有问题请检查`)
            }
        }
    }
};

/**
 * 返回子文件数量
 * @param {string} directoryPath 文件目录 
 * @returns 
 */
const getFiles = (directoryPath)=>{
    return new Promise((resolve,reject)=>{
        const exist= fs.existsSync(directoryPath);
        if(!exist){
            return resolve(0);
        }
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('读取目录时出错：', err);
                resolve(err);
                return;
            }
        
            let fileCount = 0;
        
            files.forEach((file) => {
                const filePath = path.join(directoryPath, file);
                const stats = fs.statSync(filePath);
        
                if (stats.isFile()) {
                    fileCount++;
                }
            });
            resolve(fileCount);
        })
    })
   
}

/**
 * 升序或降序返回
 * @param {*} directoryPath 文件目录路径
 * @param {*} sortType 'asc'|'desc' 升序或降序 
 */
const getFileByTime = (directoryPath, sortType='desc')=>{
    return new Promise((resolve,reject)=>{
        const exist= fs.existsSync(directoryPath);
        if(!exist){
            return resolve([]);
        }
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('读取目录时出错：', err);
                reject(err);
                return;
            }
        
            // 获取文件的修改时间
            const fileStats = files.map((file) => {
                const filePath = path.join(directoryPath, file);
                const stats = fs.statSync(filePath);
                return { filePath, file, mtime: stats.mtime,size: stats.size  };
            });
        
            // 按修改时间排序文件
            fileStats.sort((a, b) =>{
                if(sortType === 'desc'){ //降序
                  return a.size - b.size;     
                }
                return a.mtime.getTime() - b.mtime.getTime()
            });

            resolve(fileStats);
        });
    })
}

/**
 * 按分片顺序 升序
 * @param {*} directoryPath 文件目录路径
 */
const getFileSortByIndex = (directoryPath)=>{
    return new Promise((resolve,reject)=>{
        const exist= fs.existsSync(directoryPath);
        if(!exist){
            return resolve([]);
        }
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('读取目录时出错：', err);
                reject(err);
                return;
            }
            const fileList = files.sort((a, b) =>{
                const aIndex = a.split('_')[0];
                const bIndex = b.split('_')[0];
                return aIndex - bIndex;     
            }).map(filePath=>{
                return path.join(directoryPath, filePath);
            });

            resolve(fileList);
        });
    })
}

/**
 * 同步读取文件内容并合并
 * @param {*} outputFile 输出路径 
 * @param {*} files 合并路径列表
 */
const mergeFilesSync = (outputFile, files)=> {
    console.log("🚀 ~ UtilsController ~ mergeFilesSync ~ outputFile, files:", outputFile, files)
    try {
        const data = files.map(file => fs.readFileSync(file));
        fs.writeFileSync(outputFile, data.join(''));
        console.log('Files have been merged successfully.');
    } catch (err) {
        console.error('Error merging files:', err);
    }
}

/**
 * 同步读取文件内容并合并
 * @param {*} outputFile 输出路径 
 * @param {*} files 合并路径列表
 */
const appendFilesSync = (outputFile, files)=> {
    return new Promise((resolve,reject)=>{
        if(fs.existsSync(outputFile)){
            return resolve(outputFile);
        }
        try {
            files.forEach(file=>{
                fs.appendFileSync(outputFile, fs.readFileSync(file));
            })
            resolve(outputFile);
            console.log('Files have been merged successfully.');
        } catch (err) {
            console.error('Error merging files:', err);
            reject(err);
        }
    })
}


module.exports = {
    removeDirRecursive,
    getFiles,
    getFileByTime,
    mergeFilesSync,
    appendFilesSync,
    getFileSortByIndex
}